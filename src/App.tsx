import React, { useState } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import AuctionModal from './components/AuctionModal';
import { Product } from './types';

// 샘플 데이터
const sampleProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 14 Pro 256GB 스페이스 블랙',
    description: '상태 최상급, 케이스와 함께 판매합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    category: '전자기기',
    seller: {
      id: 'seller1',
      name: '믿음직한판매자',
      rating: 4.8
    },
    initialPrice: 1200000,
    isAuctionActive: true,
    location: '서울 강남구',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2시간 전
  },
  {
    id: '2',
    title: '닌텐도 스위치 OLED 화이트',
    description: '게임 5개 포함, 거의 새 상품',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    category: '게임',
    seller: {
      id: 'seller2',
      name: '게임러버',
      rating: 4.6
    },
    initialPrice: 350000,
    currentBid: 320000,
    isAuctionActive: true,
    location: '부산 해운대구',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5시간 전
  },
  {
    id: '3',
    title: 'MacBook Air M2 512GB 실버',
    description: '2022년 구매, 무선마우스 포함',
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5b52b6ee5d1f?w=400&h=300&fit=crop',
    category: '노트북',
    seller: {
      id: 'seller3',
      name: '애플매니아',
      rating: 4.9
    },
    initialPrice: 1450000,
    isAuctionActive: false,
    location: '대구 중구',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12시간 전
  },
  {
    id: '4',
    title: '갤럭시 버즈2 프로 화이트',
    description: '미개봉 새 상품, 정품 인증서 포함',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
    category: '전자기기',
    seller: {
      id: 'seller4',
      name: '전자제품왕',
      rating: 4.7
    },
    initialPrice: 180000,
    currentBid: 160000,
    isAuctionActive: true,
    location: '인천 연수구',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8) // 8시간 전
  },
  {
    id: '5',
    title: '다이슨 V11 무선청소기',
    description: '사용감 있지만 성능 좋음, A/S 1년 남음',
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    category: '가전제품',
    seller: {
      id: 'seller5',
      name: '깔끔한집',
      rating: 4.4
    },
    initialPrice: 450000,
    isAuctionActive: false,
    location: '경기 수원시',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1일 전
  },
  {
    id: '6',
    title: 'Apple Watch Series 8 45mm',
    description: '스포츠 루프 밴드 3개 포함',
    imageUrl: 'https://images.unsplash.com/photo-1510017098667-27dfc7150acb?w=400&h=300&fit=crop',
    category: '전자기기',
    seller: {
      id: 'seller6',
      name: '시계수집가',
      rating: 4.8
    },
    initialPrice: 520000,
    currentBid: 480000,
    isAuctionActive: true,
    location: '서울 마포구',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6) // 6시간 전
  }
];

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuctionModalOpen, setIsAuctionModalOpen] = useState(false);

  const handleOpenAuction = (product: Product) => {
    setSelectedProduct(product);
    setIsAuctionModalOpen(true);
  };

  const handleCloseAuction = () => {
    setIsAuctionModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Header />
      
      {/* 메인 컨텐츠 */}
      <main style={{ padding: '2rem 0' }}>
        <div className="container">
          {/* 페이지 타이틀 */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              UpDown 마켓플레이스
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              구매자가 원하는 가격으로 협상하세요! UP/DOWN 버튼으로 실시간 가격 협상이 가능합니다.
            </p>
          </div>

          {/* 카테고리 필터 (향후 구현 가능) */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {['전체', '전자기기', '게임', '노트북', '가전제품'].map(category => (
              <button
                key={category}
                className="btn btn-outline"
                style={{
                  backgroundColor: category === '전체' ? '#3b82f6' : 'transparent',
                  color: category === '전체' ? 'white' : '#64748b',
                  borderColor: category === '전체' ? '#3b82f6' : '#e2e8f0'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 상품 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {sampleProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenAuction={handleOpenAuction}
              />
            ))}
          </div>

          {/* 빈 상태 또는 로딩 메시지 */}
          {sampleProducts.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '4rem 0',
              color: '#64748b'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                📦
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                상품이 없습니다
              </h3>
              <p>새로운 상품이 등록되면 알려드릴게요!</p>
            </div>
          )}
        </div>
      </main>

      {/* 푸터 */}
      <footer style={{
        backgroundColor: '#1e293b',
        color: 'white',
        padding: '2rem 0',
        marginTop: '4rem'
      }}>
        <div className="container">
          <div style={{
            textAlign: 'center',
            fontSize: '0.875rem',
            opacity: 0.8
          }}>
            <p>© 2024 UpDown 마켓플레이스. 구매자 중심의 중고거래 플랫폼.</p>
            <p style={{ marginTop: '0.5rem' }}>
              가격 협상으로 모두가 만족하는 거래를 만들어가세요.
            </p>
          </div>
        </div>
      </footer>

      {/* 경매 모달 */}
      {selectedProduct && (
        <AuctionModal
          product={selectedProduct}
          isOpen={isAuctionModalOpen}
          onClose={handleCloseAuction}
        />
      )}
    </div>
  );
};

export default App;
