import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search } from 'lucide-react';

// LRU Cache implementation
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return null;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

// Dummy data
const dummyData = [
   { "id": 1, "name": "React Query" },
   { "id": 2, "name": "React Hooks" },
   { "id": 3, "name": "React Router" },
   { "id": 4, "name": "React State Management" },
   { "id": 5, "name": "React Performance Optimization" },
   { "id": 6, "name": "React Tutorial" },
   { "id": 7, "name": "React Best Practices" },
   { "id": 8, "name": "React vs Vue" },
   { "id": 9, "name": "React Interview Questions" },
   { "id": 10, "name": "React Roadmap" },
   { "id": 11, "name": "Next.js Server Components" },
   { "id": 12, "name": "Next.js API Routes" },
   { "id": 13, "name": "Next.js Middleware" },
   { "id": 14, "name": "Next.js Authentication" },
   { "id": 15, "name": "Next.js Performance Optimization" },
   { "id": 16, "name": "Next.js Tutorial" },
   { "id": 17, "name": "Next.js vs React" },
   { "id": 18, "name": "Next.js SEO Best Practices" },
   { "id": 19, "name": "Next.js Roadmap" },
   { "id": 20, "name": "Next.js Interview Questions" },
   { "id": 21, "name": "TypeScript Basics" },
   { "id": 22, "name": "TypeScript Interfaces" },
   { "id": 23, "name": "TypeScript Generics" },
   { "id": 24, "name": "TypeScript Utility Types" },
   { "id": 25, "name": "TypeScript vs JavaScript" },
   { "id": 26, "name": "TypeScript Tutorial" },
   { "id": 27, "name": "TypeScript Best Practices" },
   { "id": 28, "name": "TypeScript Roadmap" },
   { "id": 29, "name": "TypeScript Interview Questions" },
   { "id": 30, "name": "TypeScript Performance Optimization" },
   { "id": 31, "name": "Node.js Streams" },
   { "id": 32, "name": "Node.js Event Loop" },
   { "id": 33, "name": "Node.js File System" },
   { "id": 34, "name": "Node.js Authentication" },
   { "id": 35, "name": "Node.js WebSockets" },
   { "id": 36, "name": "Node.js Tutorial" },
   { "id": 37, "name": "Node.js Best Practices" },
   { "id": 38, "name": "Node.js vs Deno" },
   { "id": 39, "name": "Node.js Performance Optimization" },
   { "id": 40, "name": "Node.js Interview Questions" },
   { "id": 41, "name": "Redux Toolkit" },
   { "id": 42, "name": "Redux Middleware" },
   { "id": 43, "name": "Redux Thunk" },
   { "id": 44, "name": "Redux Saga" },
   { "id": 45, "name": "Redux vs Context API" },
   { "id": 46, "name": "Redux Tutorial" },
   { "id": 47, "name": "Redux Best Practices" },
   { "id": 48, "name": "Redux Performance Optimization" },
   { "id": 49, "name": "Redux Interview Questions" },
   { "id": 50, "name": "Redux Roadmap" },
   { "id": 51, "name": "Tailwind CSS Grid" },
   { "id": 52, "name": "Tailwind CSS Flexbox" },
   { "id": 53, "name": "Tailwind CSS Animations" },
   { "id": 54, "name": "Tailwind CSS Responsive Design" },
   { "id": 55, "name": "Tailwind CSS Dark Mode" },
   { "id": 56, "name": "Tailwind CSS Tutorial" },
   { "id": 57, "name": "Tailwind CSS Best Practices" },
   { "id": 58, "name": "Tailwind CSS vs Bootstrap" },
   { "id": 59, "name": "Tailwind CSS Performance Optimization" },
   { "id": 60, "name": "Tailwind CSS Interview Questions" }
];

// Highlight matched substring component
const HighlightedText = ({ text, query }) => {
  if (!query) return <span>{text}</span>;
  
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <span>
      {parts.map((part, index) => 
        regex.test(part) ? (
          <strong key={index} style={{ fontWeight: '700', color: '#1e40af' }}>
            {part}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};

// Custom hook for debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// CSS Styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
    padding: '0',
    margin: '0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  wrapper: {
    maxWidth: '640px',
    margin: '0 auto',
    padding: '60px 24px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: '48px',
    lineHeight: '1.2',
    letterSpacing: '-0.025em'
  },
  inputContainer: {
    position: 'relative',
    marginBottom: '32px'
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748b',
    width: '20px',
    height: '20px',
    zIndex: 1
  },
  input: {
    width: '100%',
    height: '56px',
    paddingLeft: '48px',
    paddingRight: '20px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    outline: 'none',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    fontFamily: 'inherit',
    color: '#1e293b'
  },
  inputFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    marginTop: '8px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    maxHeight: '320px',
    overflowY: 'auto',
    zIndex: 1000
  },
  dropdownItem: {
    padding: '16px 20px',
    cursor: 'pointer',
    fontSize: '15px',
    color: '#374151',
    borderBottom: '1px solid #f3f4f6',
    transition: 'all 0.15s ease',
    display: 'flex',
    alignItems: 'center'
  },
  dropdownItemHover: {
    backgroundColor: '#f8fafc'
  },
  dropdownItemSelected: {
    backgroundColor: '#eff6ff',
    borderColor: '#dbeafe'
  },
  dropdownItemLast: {
    borderBottom: 'none'
  },
  resultInfo: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '32px',
    fontWeight: '500'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #f1f5f9'
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '20px',
    textAlign: 'center'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '12px'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px',
    color: '#475569',
    fontWeight: '500'
  },
  checkmark: {
    color: '#10b981',
    marginRight: '12px',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  demoCard: {
    backgroundColor: '#eff6ff',
    borderRadius: '16px',
    padding: '32px',
    border: '1px solid #bfdbfe'
  },
  demoTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: '20px',
    textAlign: 'center'
  },
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'center'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    border: 'none',
    borderRadius: '24px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  buttonHover: {
    backgroundColor: '#bfdbfe',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }
};

// Main AutofillInput component
const AutofillInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  
  // Initialize LRU Cache
  const cache = useMemo(() => new LRUCache(10), []);
  
  // Debounced input value
  const debouncedInputValue = useDebounce(inputValue, 300);

  // Filter function
  const filterData = useCallback((query) => {
    if (!query.trim()) return [];
    
    const cachedResult = cache.get(query.toLowerCase());
    if (cachedResult) {
      return cachedResult;
    }

    const filtered = dummyData.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    cache.set(query.toLowerCase(), filtered);
    return filtered;
  }, [cache]);

  // Effect to handle debounced filtering
  useEffect(() => {
    if (debouncedInputValue) {
      const results = filterData(debouncedInputValue);
      setFilteredResults(results);
      setShowDropdown(true);
      setSelectedIndex(-1);
    } else {
      setFilteredResults([]);
      setShowDropdown(false);
      setSelectedIndex(-1);
    }
  }, [debouncedInputValue, filterData]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle item selection
  const handleItemSelect = (item) => {
    setInputValue(item.name);
    setShowDropdown(false);
    setSelectedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showDropdown || filteredResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleItemSelect(filteredResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
      setSelectedIndex(-1);
      setIsFocused(false);
    }, 150);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (inputValue && filteredResults.length > 0) {
      setShowDropdown(true);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>
          Autofill Input Demo
        </h1>
        
        {/* Input Container */}
        <div style={styles.inputContainer}>
          <div style={styles.inputWrapper}>
            <Search style={styles.searchIcon} />
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              onFocus={handleFocus}
              placeholder="Search technologies..."
              style={{
                ...styles.input,
                ...(isFocused ? styles.inputFocus : {})
              }}
            />
          </div>

          {/* Dropdown */}
          {showDropdown && filteredResults.length > 0 && (
            <div style={styles.dropdown}>
              {filteredResults.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleItemSelect(item)}
                  style={{
                    ...styles.dropdownItem,
                    ...(index === selectedIndex ? styles.dropdownItemSelected : {}),
                    ...(index === filteredResults.length - 1 ? styles.dropdownItemLast : {})
                  }}
                  onMouseEnter={(e) => {
                    if (index !== selectedIndex) {
                      Object.assign(e.target.style, styles.dropdownItemHover);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== selectedIndex) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <HighlightedText text={item.name} query={debouncedInputValue} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Results Info */}
        {debouncedInputValue && (
          <div style={styles.resultInfo}>
            {filteredResults.length > 0 
              ? `Found ${filteredResults.length} results for "${debouncedInputValue}"`
              : `No results found for "${debouncedInputValue}"`
            }
          </div>
        )}

        {/* Features Section */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            Features Implemented
          </h3>
          <div style={styles.featuresGrid}>
            <div style={styles.featureItem}>
              <span style={styles.checkmark}>✓</span>
              Debouncing (300ms delay)
            </div>
            <div style={styles.featureItem}>
              <span style={styles.checkmark}>✓</span>
              LRU Cache (10 items capacity)
            </div>
            <div style={styles.featureItem}>
              <span style={styles.checkmark}>✓</span>
              Substring highlighting
            </div>
            <div style={styles.featureItem}>
              <span style={styles.checkmark}>✓</span>
              Keyboard navigation
            </div>
            <div style={styles.featureItem}>
              <span style={styles.checkmark}>✓</span>
              Responsive design
            </div>
          </div>
        </div>

        {/* Demo Instructions */}
        <div style={styles.demoCard}>
          <h4 style={styles.demoTitle}>
            Try searching for:
          </h4>
          <div style={styles.buttonContainer}>
            {['react', 'typescript', 'node', 'redux', 'tailwind'].map(term => (
              <button
                key={term}
                onClick={() => setInputValue(term)}
                style={styles.button}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styles.buttonHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, styles.button);
                }}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutofillInput;