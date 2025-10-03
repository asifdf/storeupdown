import React from 'react';
import { Search, User, Heart, MessageCircle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '1rem 0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* 로고 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              background: 'white',
              color: '#667eea',
              padding: '0.5rem',
              borderRadius: '0.75rem',
              fontWeight: 'bold',
              fontSize: '1.5rem'
            }}>
              UpDown
            </div>
            <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>
              구매자 중심 중고거래
            </span>
          </div>

          {/* 검색바 */}
          <div style={{
            flex: '1',
            maxWidth: '500px',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="원하는 상품을 검색해보세요..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                borderRadius: '2rem',
                border: 'none',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <Search
              size={20}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}
            />
          </div>

          {/* 네비게이션 */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'white',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background 0.2s'
            }}>
              <Heart size={20} />
              <span>찜</span>
            </button>
            <button style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'white',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background 0.2s'
            }}>
              <MessageCircle size={20} />
              <span>채팅</span>
            </button>
            <button style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'white',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background 0.2s'
            }}>
              <User size={20} />
              <span>내정보</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
