"use client"

import { useState, useRef, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import {
  Bell,
  ChevronDown,
  Home,
  Leaf,
  Menu,
  MessageCircle,
  Package,
  RefreshCw,
  Search,
  Send,
  Settings,
  User,
  Users,
  Trash2,
  HelpCircle,
} from "lucide-react"

export default function ChatBot() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your Farm Help AI. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [chatHistory, setChatHistory] = useState([])
  const [activeChatId, setActiveChatId] = useState(null)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Sample user data
  const userData = {
    name: "Ankit Kumar",
    type: "farmer", // or "company"
  }

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (input.trim() === "" || isLoading) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setError(null)

    // Set loading state
    setIsLoading(true)

    try {
      // Prepare conversation history for the API
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      // Add the new user message
      conversationHistory.push({
        role: "user",
        content: userMessage.content,
      })

      // Make API request to DeepSeek
      const response = await fetch("http://localhost:3000/api/gemini/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userMessage.content, // sending prompt as required by your backend
        }),
      });
    
      console.log("sent: " + userMessage.content);
    
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
    
      const data = await response.json();
      console.log(data);
    
      // Add assistant response to chat
      const assistantResponse = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.response || "Sorry, I couldn't process your request.",
        timestamp: new Date().toISOString(),
      };
    
      setMessages((prev) => [...prev, assistantResponse]);
    } catch (err) {
      console.error("Error fetching response:", err);
      setError("Failed to get response. Please try again.");
    
      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "Sorry, I encountered an error while processing your request. Please try again later.",
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  // Start new chat
  const startNewChat = () => {
    setMessages([
      {
        id: 1,
        role: "assistant",
        content: "Hello! I'm your Farm Help AI. How can I help you today?",
        timestamp: new Date().toISOString(),
      },
    ])
    setError(null)
    inputRef.current?.focus()
  }

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const clearChatHistory = () => {
    setChatHistory([])
    setActiveChatId(null)
  }

  const loadChat = (chatId) => {
    setActiveChatId(chatId)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button className="md:hidden p-2 rounded-md hover:bg-gray-100" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-5 w-5" />
            </button>
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">Farm Help</span>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center px-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search messages..."
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <span className="hidden md:inline-block text-sm font-medium">{userData.name}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r shadow-sm transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-auto md:w-64 overflow-y-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center border-b px-6">
            <h2 className="text-lg font-semibold">Ask Your Doubts</h2>
          </div>
          <nav className="space-y-1 p-4">
            <a href="/dashboard/user" className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
            {userData.type === "farmer" ? (
              <a href="/orders/user" className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
                <Package className="h-5 w-5" />
                <span>Orders</span>
              </a>
            ) : (
              <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
                <Users className="h-5 w-5" />
                <span>Find Farmers</span>
              </a>
            )}
            <a href="/settings/user" className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </a>
            <a href="/help/user" className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
              <HelpCircle className="h-5 w-5" />
              <span>Help</span>
            </a>
            <a href="/farm-ai" className="flex items-center gap-3 rounded-md bg-green-50 px-3 py-2 text-green-700 font-medium">
              <MessageCircle className="h-5 w-5" />
              <span>Farm Help AI</span>
            </a>
          </nav>

          {/* Chat History */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Chat History</h3>
              <div className="flex gap-1">
                <button onClick={startNewChat} className="p-1 rounded-md hover:bg-gray-100" title="New Chat">
                  <MessageCircle className="h-4 w-4 text-gray-500" />
                </button>
                <button onClick={clearChatHistory} className="p-1 rounded-md hover:bg-gray-100" title="Clear History">
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => loadChat(chat.id)}
                  className={`w-full text-left p-2 rounded-md text-sm transition-colors duration-200 ${
                    activeChatId === chat.id ? "bg-green-100 text-green-800" : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{chat.title}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 pl-6">{chat.date}</div>
                </button>
              ))}

              {chatHistory.length === 0 && (
                <div className="text-center py-4 text-sm text-gray-500">No chat history</div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col bg-gray-50 relative">
          {/* Chat Header */}
          <div className="sticky top-0 z-10 border-b bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-sm font-medium">Farm Help AI</h2>
                  <p className="text-xs text-gray-500">Ask me anything about Farming</p>
                </div>
              </div>
              <button
                onClick={startNewChat}
                className="rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                title="New Chat"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pt-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-green-600 text-white"
                      : message.isError
                        ? "bg-red-50 border border-red-200 text-red-800"
                        : "bg-white border shadow-sm"
                  }`}
                >
                  {message.role === "user" ? (
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  ) : (
                    <div className="markdown-content">
                      <ReactMarkdown
                        components={{
                          p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                          strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                          em: ({ node, ...props }) => <em className="italic" {...props} />,
                          ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2" {...props} />,
                          ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-2" {...props} />,
                          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                          h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-2" {...props} />,
                          h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2" {...props} />,
                          h3: ({ node, ...props }) => <h3 className="text-md font-bold mb-2" {...props} />,
                          a: ({ node, ...props }) => (
                            <a
                              className="text-blue-600 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                              {...props}
                            />
                          ),
                          code: ({ node, inline, ...props }) =>
                            inline ? (
                              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props} />
                            ) : (
                              <code className="block bg-gray-100 p-2 rounded text-sm overflow-x-auto my-2" {...props} />
                            ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                  <div
                    className={`text-right text-xs mt-1 ${
                      message.role === "user" ? "text-green-100" : message.isError ? "text-red-400" : "text-gray-400"
                    }`}
                  >
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="max-w-[80%] rounded-lg p-3 bg-white border shadow-sm">
                  <div className="flex space-x-2">
                    <div
                      className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && !isLoading && (
              <div className="flex justify-center animate-fadeIn">
                <div className="rounded-lg p-2 bg-red-50 border border-red-200 text-red-800 text-sm">{error}</div>
              </div>
            )}

            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t bg-white p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message here..."
                className="flex-1 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                ref={inputRef}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-green-600 p-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={input.trim() === "" || isLoading}
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            <p className="mt-2 text-xs text-gray-500 text-center">
              Farm Help Assistant can help with crop prices, order management, and more.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
