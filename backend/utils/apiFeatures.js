class APIFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    // Search by name, crops, or any keyword field
    search() {
      if (this.queryStr.keyword) {
        const keywordFilter = {
          $or: [
            { name: { $regex: this.queryStr.keyword, $options: "i" } },
            { crops: { $regex: this.queryStr.keyword, $options: "i" } }
          ]
        };
        this.query = this.query.find(keywordFilter);
      }
      return this;
    }
  
    // Filters for numeric ranges and other fields
    filter() {
      const queryCopy = { ...this.queryStr };
      const removeFields = ["keyword", "limit", "page"];
  
      // Remove unwanted fields
      removeFields.forEach((key) => delete queryCopy[key]);
  
      // Convert operators like "gte" to MongoDB format "$gte"
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
    }
  
    // Pagination with default values
    pagination(resPerPage = 10) {
      const currentPage = Number(this.queryStr.page) || 1;
      const limit = Math.min(Number(this.queryStr.limit) || resPerPage, 100); // Prevent huge limits
      const skip = limit * (currentPage - 1);
  
      this.query = this.query.limit(limit).skip(skip);
      return this;
    }
  }
  
  module.exports = APIFeatures;
  