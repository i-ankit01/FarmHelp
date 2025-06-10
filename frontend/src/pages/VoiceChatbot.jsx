import { useState, useEffect, useRef } from "react"
import "../animations/animation.css"
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../store/userSlice";
import {Mic} from "lucide-react";

const VoiceChatbot = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [chatbotState, setChatbotState] = useState("idle") // idle, listening, replying
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)
  const recognitionRef = useRef(null)
  const synthRef = useRef(window.speechSynthesis)
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      console.log("Dispatching fetchUserData...");
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);

  useEffect(() => {
    // Set up speech recognition
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        handleUserInput(transcript)
      }

      recognitionRef.current.onend = () => {
        if (chatbotState === "listening") {
          setChatbotState("idle")
        }
      }

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error)
        setChatbotState("idle")
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const startListening = () => {
    if (recognitionRef.current) {
      setChatbotState("listening")
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error("Speech recognition error:", error)
        setChatbotState("idle")
      }
    } else {
      setTimeout(() => {
        handleUserInput("Hello, can you help me?")
      }, 1500)
    }
  }

  const handleUserInput = (text) => {
    const newMessages = [...messages, { sender: "user", text }]
    setMessages(newMessages)

    setChatbotState("replying")

    fetchResponseFromBackend(text)
  }

  const fetchResponseFromBackend = async (userInput) => {
    try {
      const response = await fetch(`${backendUrl}/api/detect-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      })
      const data = await response.json()
      console.log(data)

      // checking the intent 
      let speakData = ""
      if (data.intent == "CheckOrders") speakData = `You have total ${user?.farmer?.orders?.length ?? 0} orders. Including ${user?.farmer?.orders ?.filter(order => order.status === "Pending")?.length ?? 0} pending orders and ${user?.farmer?.orders ?.filter(order => order.status === "Accepted")?.length ?? 0} accepted orders`
      else if (data.intent == 'AccountInfo') speakData = `Your name is ${user?.farmer?.firstName}. And you currently grow ${user?.farmer?.crops?.map((crop) => crop).join(", ")}.`;
      else if (data.intent == 'Default Welcome Intent') speakData = `Hello ${user?.farmer?.firstName}, How can i help you`;
      else if (data.intent == 'Default Fallback Intent') speakData = "Sorry didn't here that, can you please speak again";
      else if (data.intent == 'AcceptOrder') speakData = "Order Accepted";
      // {intent: 'AcceptOrder', response: 'Order accepted', parameters: 3}
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: speakData }, 
      ])

      // Speak
      if (synthRef.current ) {
        const utterance = new SpeechSynthesisUtterance(speakData)
        utterance.onend = () => {
          setChatbotState("idle")
        }
        synthRef.current.speak(utterance)
      }
       else {
        setChatbotState("idle")
      }
    } catch (error) {
      console.error("Error fetching from backend:", error)
      setChatbotState("idle")
    }
  }

  const toggleChatbot = () => {
    if (!isOpen) {
      setIsOpen(true)
    } else {
      if (chatbotState === "idle") {
        startListening()
      } else if (chatbotState === "listening") {
        // Cancel listening if clicked again during listening state
        if (recognitionRef.current) {
          recognitionRef.current.abort()
        }
        setChatbotState("idle")
      }
    }
  }

  const closeChatbot = () => {
    setIsOpen(false)
    setChatbotState("idle")
    if (recognitionRef.current) {
      recognitionRef.current.abort()
    }
    if (synthRef.current) {
      synthRef.current.cancel()
    }
  }

  return (
    <div className="voice-chatbot-container">
      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header bg-gradient-to-br from-green-700 to-green-500">
            <h3>FarmHelp Assistant</h3>
            <button onClick={closeChatbot} className="close-button">
              &times;
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <p>Hello! How can I help you today?</p>
                <p className="hint">Click the microphone button to speak</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-footer">
            <div className="chatbot-status">
              {chatbotState === "listening" && "Listening..."}
              {chatbotState === "replying" && "Replying..."}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={toggleChatbot}
        className={`chatbot-button bg-gradient-to-br from-red-300 to-red-600 ${chatbotState} ${isOpen ? "open" : ""}`}
        aria-label="Voice Assistant"
      >
        {!isOpen ? (
          <img src="https://cdn3d.iconscout.com/3d/premium/thumb/robot-3d-icon-download-in-png-blend-fbx-gltf-file-formats--ai-technology-machine-activity-pack-science-icons-7746765.png" alt="AI Assistant" className="robot-icon" />
        ) : chatbotState === "idle" ? (
            <Mic size={32} color="black" />
        ) : chatbotState === "listening" ? (
          <div className="listening-animation">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <div className="replying-animation">
            <div className="dot-flashing"></div>
          </div>
        )}
      </button>
    </div>
  )
}

export default VoiceChatbot
