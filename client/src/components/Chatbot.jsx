import React, { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend, FiUser, FiSettings, FiZap } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI shopping assistant. I can help you with products, orders, and anything else you need!",
      sender: 'bot',
      timestamp: new Date(),
      aiModel: 'assistant'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiModel, setAiModel] = useState('assistant');
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    'hello': "Hello! Welcome to WorkShala. I'm your AI shopping assistant. How can I help you today?",
    'hi': "Hi there! I can help you find products, check orders, or answer any questions about WorkShala.",
    'products': "We have four main categories:\n\n📚 Books: Programming, business, design\n💻 Electronics: Headphones, keyboards, devices\n🪑 Furniture: Office chairs, tables, shelves\n✏️ Stationery: Art supplies, pens, notebooks\n\nWhich category interests you?",
    'books': "Our book collection includes:\n• JavaScript & React guides\n• Python for Data Science\n• Business strategy books\n• All with fast delivery!",
    'electronics': "Electronics we offer:\n🎧 Wireless headphones (₹2,499)\n💡 Smart LED lamps (₹1,599)\n⌨️ Mechanical keyboards (₹4,299)\n🖱️ Wireless mice (₹899)\nAll with 1-year warranty!",
    'furniture': "Our furniture collection:\n💺 Ergonomic office chairs (₹8,999)\n🪑 Gaming chairs (₹14,999)\n📚 Bookshelves (₹12,999)\nFree assembly service available!",
    'stationery': "Stationery products:\n🎨 Professional sketchbooks (₹1,299)\n✒️ Fountain pen sets (₹2,999)\n🖌️ Art supplies (₹1,899)\nPerfect for students and professionals!",
    'shipping': "🚚 Free shipping on orders above ₹499\nStandard delivery: 3-5 business days\nReal-time order tracking available",
    'delivery': "📦 Most orders delivered in 3-5 days\nYou'll get SMS/email updates\nTrack your order in 'My Orders'",
    'return': "🔄 7-day easy returns\nProducts must be unused\nFree return shipping\nRefund in 3-5 days",
    'payment': "💳 Credit/Debit cards\nUPI payments\nNet banking\nCash on delivery",
    'track order': "To track your order:\n1. Go to your Profile\n2. Click 'My Orders'\n3. Find your order and click 'Track'",
    'contact': "📞 Phone: +91 98765 43210\n✉️ Email: support@workshala.com\nLive chat: Available 24/7",
    'support': "🛟 24/7 customer support\nCall: +91 98765 43210\nEmail: support@workshala.com",
    'discount': "🎁 Current Offers:\n• 50% OFF on headphones\n• BOGO on stationery\n• Free shipping over ₹499",
    'warranty': "🛡️ Electronics: 1 year\nFurniture: 6 months\nEasy claim process",
    'help': "I can help with:\n🛍️ Product info & recommendations\n📦 Order tracking & delivery\n💳 Payments & security\n🛟 Support & issues\n🎁 Offers & discounts",
    'default': "I'm here to help! I can assist with:\n• Product information\n• Order tracking\n• Return policies\n• Payment methods\n• Current offers\n\nWhat would you like to know?"
  };

  const simulateAIResponse = async (userMessage, model) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerMessage = userMessage.toLowerCase();
        let response = botResponses.default;
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
          response = botResponses.hello;
        } else if (lowerMessage.includes('product')) {
          response = botResponses.products;
        } else if (lowerMessage.includes('book')) {
          response = botResponses.books;
        } else if (lowerMessage.includes('electronic')) {
          response = botResponses.electronics;
        } else if (lowerMessage.includes('furniture')) {
          response = botResponses.furniture;
        } else if (lowerMessage.includes('stationery')) {
          response = botResponses.stationery;
        } else if (lowerMessage.includes('shipping')) {
          response = botResponses.shipping;
        } else if (lowerMessage.includes('return')) {
          response = botResponses.return;
        } else if (lowerMessage.includes('payment')) {
          response = botResponses.payment;
        } else if (lowerMessage.includes('track')) {
          response = botResponses['track order'];
        } else if (lowerMessage.includes('contact')) {
          response = botResponses.contact;
        } else if (lowerMessage.includes('support')) {
          response = botResponses.support;
        } else if (lowerMessage.includes('discount')) {
          response = botResponses.discount;
        } else if (lowerMessage.includes('warranty')) {
          response = botResponses.warranty;
        }

        if (model === 'openai') {
          response = `🤖 OpenAI: ${response}`;
        } else if (model === 'gemini') {
          response = `🌟 Gemini: ${response}`;
        }

        resolve(response);
      }, 1500);
    });
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      aiModel: null
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const botResponse = await simulateAIResponse(inputMessage, aiModel);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        aiModel: aiModel
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting right now. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        aiModel: aiModel
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Recommend electronics",
    "Shipping costs?",
    "Return policy",
    "Contact support"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const aiModels = [
    { id: 'assistant', name: 'WorkShala AI', icon: '👋' },
    { id: 'openai', name: 'OpenAI GPT', icon: '🤖' },
    { id: 'gemini', name: 'Google Gemini', icon: '🌟' }
  ];

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 flex items-center justify-center z-50 hover:scale-110"
        >
          <FiMessageCircle size={24} className="sm:w-6 sm:h-6" />
          <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full animate-pulse border-2 border-gray-900"></div>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-4 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 sm:h-[600px] w-auto h-auto max-h-[85vh] bg-gray-800 rounded-2xl sm:rounded-2xl shadow-2xl border border-gray-700/50 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-t-2xl p-4 sm:p-5 flex-shrink-0">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <FaRobot className="text-yellow-500 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base sm:text-lg">AI Shopping Assistant</h3>
                  <p className="text-white/90 text-xs sm:text-sm">
                    {aiModels.find(model => model.id === aiModel)?.name} • Online
                  </p>
                </div>
              </div>
              <div className="flex gap-1 sm:gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-gray-200 transition-colors p-1 sm:p-2 bg-white/10 rounded-lg backdrop-blur-sm"
                >
                  <FiSettings className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors p-1 sm:p-2 bg-white/10 rounded-lg backdrop-blur-sm"
                >
                  <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {showSettings && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 mt-2 sm:mt-3 border border-white/20">
                <p className="text-white text-sm font-semibold mb-2 sm:mb-3">Choose AI Model:</p>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {aiModels.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setAiModel(model.id);
                        setShowSettings(false);
                      }}
                      className={`p-2 sm:p-3 rounded-xl text-xs sm:text-sm transition-all duration-300 ${
                        aiModel === model.id
                          ? 'bg-white text-yellow-600 font-semibold shadow-lg transform scale-105'
                          : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
                      }`}
                    >
                      <div className="text-base sm:text-lg mb-1">{model.icon}</div>
                      <div className="font-medium truncate text-xs sm:text-sm">{model.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 sm:p-5 overflow-y-auto bg-gray-900/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 sm:gap-4 mb-4 ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                    message.sender === 'user'
                      ? 'bg-yellow-500 text-gray-900'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  {message.sender === 'user' ? 
                    <FiUser className="w-3 h-3 sm:w-4 sm:h-4" /> : 
                    <FaRobot className="w-3 h-3 sm:w-4 sm:h-4" />
                  }
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl p-3 sm:p-4 shadow-lg ${
                    message.sender === 'user'
                      ? 'bg-yellow-500 text-gray-900 rounded-br-none'
                      : 'bg-gray-700 text-white rounded-bl-none'
                  }`}
                >
                  <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                  <div className="flex items-center justify-between mt-1 sm:mt-2">
                    <p className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {message.aiModel && message.sender === 'bot' && (
                      <span className="text-xs opacity-70">
                        {aiModels.find(m => m.id === message.aiModel)?.icon}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 sm:gap-4 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-700 flex items-center justify-center shadow-lg">
                  <FaRobot className="text-white w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="bg-gray-700 text-white rounded-2xl rounded-bl-none p-3 sm:p-4 shadow-lg">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex gap-1 sm:gap-1.5">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-300">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className="px-3 sm:px-5 pb-2 sm:pb-3 flex-shrink-0">
              <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 font-medium">Quick questions:</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-600 hover:border-gray-500 flex-1 min-w-[45%] text-center"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 sm:p-5 border-t border-gray-700/50 bg-gray-800 flex-shrink-0">
            <div className="flex gap-2 sm:gap-3 mb-2 sm:mb-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ask ${aiModels.find(m => m.id === aiModel)?.name}...`}
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg sm:rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm transition-all duration-300"
              />
              <button
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === '' || isTyping}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 p-2.5 sm:p-4 rounded-lg sm:rounded-xl hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 min-w-[44px] sm:min-w-[52px] flex items-center justify-center"
              >
                <FiSend className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-xs">
                Powered by {aiModels.find(m => m.id === aiModel)?.name}
              </p>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-gray-500 hover:text-gray-400 transition-colors text-xs flex items-center gap-1 sm:gap-2 font-medium"
              >
                <FiZap className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Switch AI</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;