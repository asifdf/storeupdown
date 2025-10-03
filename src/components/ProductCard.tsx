import React from 'react';
import { Heart, MapPin, Clock, TrendingUp } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenAuction: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenAuction }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString() + '원';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    return '방금 전';
  };

  return (
    <div 
      className="card"
      style={{
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onClick={() => onOpenAuction(product)}
    >
      {/* 상품 이미지 */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img
          src={product.imageUrl}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        {/* 찜하기 버튼 */}
        <button
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'rgba(0, 0, 0, 0.5)',
            border: 'none',
            borderRadius: '50%',
            padding: '0.5rem',
            cursor: 'pointer',
            color: 'white',
            transition: 'all 0.2s'
          }}
          onClick={(e) => {
            e.stopPropagation();
            // 찜하기 로직
          }}
        >
          <Heart size={16} />
        </button>
        
        {/* 경매 상태 배지 */}
        {product.isAuctionActive && (
          <div style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            <TrendingUp size={12} />
            경매중
          </div>
        )}
      </div>

      {/* 상품 정보 */}
      <div style={{ padding: '1rem' }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '600',
          marginBottom: '0.5rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {product.title}
        </h3>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginBottom: '1rem'
        }}>
          {/* 가격 정보 */}
          <div>
            <div style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#3b82f6'
            }}>
              {formatPrice(product.currentBid || product.initialPrice)}
            </div>
            {product.currentBid && (
              <div style={{
                fontSize: '0.875rem',
                color: '#64748b',
                textDecoration: 'line-through'
              }}>
                {formatPrice(product.initialPrice)}
              </div>
            )}
          </div>

          {/* 위치 및 시간 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: '#64748b'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <MapPin size={12} />
              {product.location}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={12} />
              {formatTimeAgo(product.createdAt)}
            </div>
          </div>
        </div>

        {/* 판매자 정보 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '0.75rem',
          borderTop: '1px solid #e2e8f0'
        }}>
          <div style={{
            fontSize: '0.875rem',
            color: '#64748b'
          }}>
            {product.seller.name}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.75rem',
            color: '#fbbf24'
          }}>
            ⭐ {product.seller.rating.toFixed(1)}
          </div>
        </div>

        {/* 경매 참여 버튼 */}
        <button
          className="btn btn-primary"
          style={{
            width: '100%',
            marginTop: '0.75rem'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onOpenAuction(product);
          }}
        >
          <TrendingUp size={16} />
          가격 협상하기
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
