import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Check, AlertCircle, User, Star } from 'lucide-react';
import { Product, AuctionState } from '../types';

interface AuctionModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const AuctionModal: React.FC<AuctionModalProps> = ({ product, isOpen, onClose }) => {
  const [auctionState, setAuctionState] = useState<AuctionState>({
    currentPrice: product.initialPrice,
    buyerPrice: product.initialPrice,
    sellerPrice: product.initialPrice,
    isNegotiating: false
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [negotiationHistory, setNegotiationHistory] = useState<Array<{
    type: 'buyer' | 'seller';
    price: number;
    timestamp: Date;
  }>>([]);

  // 가격 포맷팅
  const formatPrice = (price: number) => {
    return price.toLocaleString() + '원';
  };

  // UP 버튼 클릭 (구매자가 가격 올리기)
  const handlePriceUp = () => {
    const increment = Math.floor(auctionState.currentPrice * 0.05); // 5% 증가
    const newPrice = auctionState.buyerPrice + increment;
    
    setAuctionState(prev => ({
      ...prev,
      buyerPrice: newPrice,
      currentPrice: newPrice,
      isNegotiating: true
    }));

    setNegotiationHistory(prev => [...prev, {
      type: 'buyer',
      price: newPrice,
      timestamp: new Date()
    }]);

    // 판매자 응답 시뮬레이션 (실제로는 서버 통신)
    setTimeout(() => {
      simulateSellerResponse(newPrice);
    }, 2000);
  };

  // DOWN 버튼 클릭 (구매자가 가격 내리기)
  const handlePriceDown = () => {
    const decrement = Math.floor(auctionState.currentPrice * 0.05); // 5% 감소
    const newPrice = Math.max(auctionState.buyerPrice - decrement, product.initialPrice * 0.3); // 최소 30%까지만
    
    setAuctionState(prev => ({
      ...prev,
      buyerPrice: newPrice,
      currentPrice: newPrice,
      isNegotiating: true
    }));

    setNegotiationHistory(prev => [...prev, {
      type: 'buyer',
      price: newPrice,
      timestamp: new Date()
    }]);

    // 판매자 응답 시뮬레이션
    setTimeout(() => {
      simulateSellerResponse(newPrice);
    }, 2000);
  };

  // 판매자 응답 시뮬레이션
  const simulateSellerResponse = (buyerPrice: number) => {
    const acceptanceThreshold = product.initialPrice * 0.8; // 80% 이상이면 수락
    const sellerMinPrice = product.initialPrice * 0.7; // 판매자 최소가격 70%

    if (buyerPrice >= acceptanceThreshold) {
      // 거래 성사
      setAuctionState(prev => ({
        ...prev,
        finalPrice: buyerPrice,
        isNegotiating: false
      }));
      setShowSuccess(true);
    } else if (buyerPrice >= sellerMinPrice) {
      // 판매자가 역제안
      const sellerCounterOffer = Math.floor((buyerPrice + product.initialPrice) / 2);
      setAuctionState(prev => ({
        ...prev,
        sellerPrice: sellerCounterOffer,
        currentPrice: sellerCounterOffer
      }));
      
      setNegotiationHistory(prev => [...prev, {
        type: 'seller',
        price: sellerCounterOffer,
        timestamp: new Date()
      }]);
    } else {
      // 가격이 너무 낮음
      setAuctionState(prev => ({
        ...prev,
        isNegotiating: false
      }));
    }
  };

  // 판매자 제안 수락
  const acceptSellerOffer = () => {
    setAuctionState(prev => ({
      ...prev,
      finalPrice: prev.sellerPrice,
      isNegotiating: false
    }));
    setShowSuccess(true);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        {/* 헤더 */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1e293b'
          }}>
            가격 협상
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              color: '#64748b'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* 상품 정보 */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          gap: '1rem'
        }}>
          <img
            src={product.imageUrl}
            alt={product.title}
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '0.5rem'
            }}
          />
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              {product.title}
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <User size={16} />
              <span>{product.seller.name}</span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <Star size={14} fill="#fbbf24" color="#fbbf24" />
                <span>{product.seller.rating.toFixed(1)}</span>
              </div>
            </div>
            <div style={{
              fontSize: '1rem',
              color: '#64748b'
            }}>
              희망가격: {formatPrice(product.initialPrice)}
            </div>
          </div>
        </div>

        {/* 성공 메시지 */}
        {showSuccess && (
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f0fdf4',
            margin: '1.5rem',
            borderRadius: '0.75rem',
            border: '1px solid #bbf7d0',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
              color: '#16a34a',
              fontSize: '1.25rem',
              fontWeight: 'bold'
            }}>
              <Check size={24} />
              거래 성사!
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#16a34a'
            }}>
              최종 거래가: {formatPrice(auctionState.finalPrice!)}
            </div>
            <div style={{
              marginTop: '1rem',
              fontSize: '0.875rem',
              color: '#059669'
            }}>
              판매자와 연락하여 거래를 진행해주세요.
            </div>
          </div>
        )}

        {/* 현재 가격 표시 */}
        {!showSuccess && (
          <div style={{
            padding: '1.5rem',
            textAlign: 'center',
            backgroundColor: '#f8fafc'
          }}>
            <div style={{
              fontSize: '0.875rem',
              color: '#64748b',
              marginBottom: '0.5rem'
            }}>
              현재 제안가
            </div>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#3b82f6',
              marginBottom: '1rem'
            }}>
              {formatPrice(auctionState.currentPrice)}
            </div>

            {/* UP/DOWN 버튼 */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <button
                className="btn btn-success"
                onClick={handlePriceUp}
                disabled={auctionState.isNegotiating}
                style={{
                  minWidth: '120px',
                  opacity: auctionState.isNegotiating ? 0.5 : 1
                }}
              >
                <TrendingUp size={20} />
                UP (+5%)
              </button>
              <button
                className="btn btn-danger"
                onClick={handlePriceDown}
                disabled={auctionState.isNegotiating}
                style={{
                  minWidth: '120px',
                  opacity: auctionState.isNegotiating ? 0.5 : 1
                }}
              >
                <TrendingDown size={20} />
                DOWN (-5%)
              </button>
            </div>

            {auctionState.isNegotiating && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                color: '#f59e0b',
                fontSize: '0.875rem'
              }}>
                <AlertCircle size={16} />
                판매자 응답 대기중...
              </div>
            )}

            {/* 판매자 역제안 */}
            {auctionState.sellerPrice !== auctionState.buyerPrice && 
             auctionState.sellerPrice !== product.initialPrice && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#fffbeb',
                borderRadius: '0.5rem',
                border: '1px solid #fed7aa'
              }}>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#92400e',
                  marginBottom: '0.5rem'
                }}>
                  판매자 역제안
                </div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#d97706',
                  marginBottom: '0.75rem'
                }}>
                  {formatPrice(auctionState.sellerPrice)}
                </div>
                <button
                  className="btn btn-primary"
                  onClick={acceptSellerOffer}
                  style={{ width: '100%' }}
                >
                  제안 수락
                </button>
              </div>
            )}
          </div>
        )}

        {/* 협상 히스토리 */}
        {negotiationHistory.length > 0 && (
          <div style={{ padding: '1.5rem' }}>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#374151'
            }}>
              협상 과정
            </h4>
            <div style={{
              maxHeight: '200px',
              overflow: 'auto',
              gap: '0.5rem',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {negotiationHistory.map((entry, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: entry.type === 'buyer' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    backgroundColor: entry.type === 'buyer' ? '#3b82f6' : '#f59e0b',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '1rem',
                    fontSize: '0.875rem',
                    maxWidth: '60%'
                  }}>
                    <div style={{ fontWeight: '600' }}>
                      {entry.type === 'buyer' ? '구매자' : '판매자'}
                    </div>
                    <div>{formatPrice(entry.price)}</div>
                    <div style={{
                      fontSize: '0.75rem',
                      opacity: 0.8
                    }}>
                      {entry.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionModal;
