import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DS = {
  emerald: '#006c49',
  emeraldLight: '#10b981',
  charcoalDeep: '#1f2937',
  charcoalBase: '#555f6f',
  onSurface: '#191c1d',
  surface: '#f8f9fa',
  surfaceLow: '#f3f4f5',
  surfaceContainer: '#edeeef',
  surfaceHigh: '#e7e8e9',
  surfaceWhite: '#ffffff',
};

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [buyLoading, setBuyLoading] = useState(false);
  const [buySuccess, setBuySuccess] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        const product = data.data.product;
        setProduct(product);
        setSelectedImage(product.mainImage);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleBuy = async () => {
    setBuyLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}/buy`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Purchase failed');
      setBuySuccess(true);
    } catch {
      alert('Purchase failed. Please try again.');
    } finally {
      setBuyLoading(false);
    }
  };

  const allImages = product ? [product.mainImage, ...(product.images || [])].filter(Boolean) : [];

  const statusConfig = {
    for_sale: { label: 'Available', color: DS.emerald, bg: '#e6f4ef', dot: DS.emeraldLight },
    sold: { label: 'Sold', color: DS.charcoalBase, bg: DS.surfaceHigh, dot: '#9ca3af' },
    reserved: { label: 'Reserved', color: '#92400e', bg: '#fef3c7', dot: '#f59e0b' },
  };
  const status = statusConfig[product?.status] || statusConfig.for_sale;

  if (loading) {
    return (
      <div style={{ background: DS.surface, minHeight: '100vh' }}>
        <div style={styles.skeleton}>
          <div style={{ ...styles.skeletonBlock, height: 460, borderRadius: 12 }} />
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, paddingTop: 8 }}
          >
            <div style={{ ...styles.skeletonBlock, height: 14, width: '25%', borderRadius: 6 }} />
            <div style={{ ...styles.skeletonBlock, height: 36, width: '80%', borderRadius: 6 }} />
            <div style={{ ...styles.skeletonBlock, height: 36, width: '40%', borderRadius: 6 }} />
            <div style={{ ...styles.skeletonBlock, height: 90, marginTop: 8, borderRadius: 6 }} />
            <div style={{ ...styles.skeletonBlock, height: 52, marginTop: 16, borderRadius: 8 }} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...styles.page, background: DS.surface }}>
        <div style={styles.errorWrapper}>
          <div style={styles.errorIcon}>?</div>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: DS.onSurface,
              margin: 0,
            }}
          >
            Product not found
          </p>
          <p
            style={{
              fontSize: 14,
              color: DS.charcoalBase,
              margin: 0,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {error}
          </p>
          <button style={styles.buyBtn} onClick={() => navigate('/market')}>
            ← Back to Market
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...styles.page, background: DS.surface }}>
      {/* Breadcrumb */}
      <nav style={styles.breadcrumb}>
        <span style={styles.breadcrumbLink} onClick={() => navigate('/market')}>
          Market
        </span>
        <span style={styles.breadcrumbSep}>/</span>
        <span style={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      {/* Main Grid */}
      <div style={styles.grid}>
        {/* ── Left: Image Gallery ── */}
        <div style={styles.imageSection}>
          <div style={styles.mainImageWrapper}>
            <img
              src={selectedImage || product.mainImage}
              alt={product.name}
              style={styles.mainImage}
              onError={(e) => {
                e.target.src = 'https://placehold.co/700x520?text=No+Image';
              }}
            />
            {product.status === 'sold' && (
              <div style={styles.soldOverlay}>
                <span style={styles.soldText}>SOLD</span>
              </div>
            )}
          </div>

          {allImages.length > 1 && (
            <div style={styles.thumbnailRow}>
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    ...styles.thumbnail,
                    background: selectedImage === img ? DS.surfaceWhite : DS.surfaceHigh,
                    outline: selectedImage === img ? `2px solid ${DS.emerald}` : 'none',
                    outlineOffset: 2,
                  }}
                >
                  <img
                    src={img}
                    alt={`View ${i + 1}`}
                    style={styles.thumbnailImg}
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/80x80?text=X';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Product Info ── */}
        <div style={styles.infoSection}>
          {/* Status + Brand chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ ...styles.chip, background: status.bg, color: status.color }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: status.dot,
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              {status.label}
            </span>
            {product.brand && (
              <span style={{ ...styles.chip, background: DS.surfaceHigh, color: DS.charcoalBase }}>
                {product.brand}
              </span>
            )}
          </div>

          {/* Product name */}
          <h1 style={styles.productName}>{product.name}</h1>

          {/* Price */}
          <div style={styles.priceBlock}>
            <span style={styles.priceCurrency}>$</span>
            <span style={styles.priceAmount}>{Number(product.price).toFixed(2)}</span>
          </div>

          {/* Description */}
          {product.description && (
            <div style={styles.descriptionBlock}>
              <p style={styles.descriptionLabel}>About this product</p>
              <p style={styles.descriptionText}>{product.description}</p>
            </div>
          )}

          {/* Meta — tonal background, no dividers */}
          <div style={styles.metaBlock}>
            <div style={{ ...styles.metaRow, background: DS.surfaceWhite }}>
              <span style={styles.metaLabel}>Product ID</span>
              <span style={styles.metaValue}>#{product.id}</span>
            </div>
            {product.brand && (
              <div style={{ ...styles.metaRow, background: DS.surfaceLow }}>
                <span style={styles.metaLabel}>Brand</span>
                <span style={styles.metaValue}>{product.brand}</span>
              </div>
            )}
            <div style={{ ...styles.metaRow, background: DS.surfaceWhite }}>
              <span style={styles.metaLabel}>Availability</span>
              <span style={{ ...styles.metaValue, color: status.color, fontWeight: 600 }}>
                {status.label}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div style={styles.actions}>
            {buySuccess ? (
              <div style={styles.successMsg}>✓ Purchase successful! Check your inventory.</div>
            ) : product.status === 'for_sale' ? (
              <button
                style={{
                  ...styles.buyBtn,
                  opacity: buyLoading ? 0.75 : 1,
                  cursor: buyLoading ? 'not-allowed' : 'pointer',
                }}
                onClick={handleBuy}
                disabled={buyLoading}
              >
                {buyLoading ? 'Processing…' : `Buy Now · $${Number(product.price).toFixed(2)}`}
              </button>
            ) : (
              <button style={styles.disabledBtn} disabled>
                {status.label} — Not available
              </button>
            )}

            <button style={styles.backLink} onClick={() => navigate('/market')}>
              ← Back to Market
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    maxWidth: 1140,
    margin: '0 auto',
    padding: '36px 28px 80px',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 32,
    fontSize: 13,
    fontFamily: "'Inter', sans-serif",
  },
  breadcrumbLink: {
    color: DS.emerald,
    cursor: 'pointer',
    fontWeight: 500,
  },
  breadcrumbSep: {
    color: '#c4c9cf',
    margin: '0 10px',
  },
  breadcrumbCurrent: {
    color: DS.charcoalBase,
    fontWeight: 400,
    maxWidth: 340,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
    gap: 56,
    alignItems: 'start',
  },
  imageSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  mainImageWrapper: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    background: DS.surfaceContainer,
    aspectRatio: '4/3',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  soldOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(31, 41, 55, 0.55)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  soldText: {
    fontFamily: "'Manrope', sans-serif",
    fontSize: 22,
    fontWeight: 800,
    color: '#fff',
    letterSpacing: 6,
    padding: '10px 24px',
    background: 'rgba(255,255,255,0.12)',
    borderRadius: 8,
  },
  thumbnailRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    cursor: 'pointer',
    padding: 0,
    border: 'none',
    transition: 'outline 0.15s',
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 4,
  },
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '5px 12px',
    borderRadius: '0.75rem',
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    letterSpacing: 0.1,
  },
  productName: {
    fontFamily: "'Manrope', sans-serif",
    fontSize: '2rem',
    fontWeight: 800,
    color: DS.onSurface,
    margin: '0 0 20px',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  priceBlock: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 2,
    marginBottom: 24,
  },
  priceCurrency: {
    fontFamily: "'Manrope', sans-serif",
    fontSize: '1.1rem',
    fontWeight: 700,
    color: DS.emerald,
    marginTop: 4,
  },
  priceAmount: {
    fontFamily: "'Manrope', sans-serif",
    fontSize: '2.2rem',
    fontWeight: 800,
    color: DS.onSurface,
    letterSpacing: '-0.03em',
  },
  descriptionBlock: {
    background: DS.surfaceLow,
    borderRadius: 12,
    padding: '16px 18px',
    marginBottom: 20,
  },
  descriptionLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: DS.charcoalBase,
    margin: '0 0 8px',
  },
  descriptionText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    lineHeight: 1.75,
    color: DS.charcoalDeep,
    margin: 0,
  },
  metaBlock: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    boxShadow: '0 12px 32px rgba(31,41,55,0.06)',
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '13px 18px',
    fontSize: 14,
    fontFamily: "'Inter', sans-serif",
  },
  metaLabel: {
    color: DS.charcoalBase,
    fontWeight: 400,
  },
  metaValue: {
    color: DS.onSurface,
    fontWeight: 500,
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  buyBtn: {
    width: '100%',
    padding: '15px 24px',
    background: 'linear-gradient(135deg, #006c49 0%, #10b981 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontFamily: "'Manrope', sans-serif",
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: 0.2,
    boxShadow: '0 4px 14px rgba(0, 108, 73, 0.25)',
  },
  disabledBtn: {
    width: '100%',
    padding: '15px 24px',
    background: DS.surfaceHigh,
    color: DS.charcoalBase,
    border: 'none',
    borderRadius: 8,
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    cursor: 'not-allowed',
  },
  backLink: {
    background: 'none',
    border: 'none',
    color: DS.charcoalBase,
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    padding: '6px 0',
    textAlign: 'left',
  },
  successMsg: {
    padding: '15px 18px',
    background: '#e6f4ef',
    color: DS.emerald,
    borderRadius: 8,
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 600,
    textAlign: 'center',
  },
  skeleton: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 56,
    alignItems: 'start',
    maxWidth: 1140,
    margin: '0 auto',
    padding: '48px 28px',
  },
  skeletonBlock: {
    background: `linear-gradient(90deg, #f3f4f5 25%, #edeeef 50%, #f3f4f5 75%)`,
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.4s infinite',
  },
  errorWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 24px',
    gap: 12,
    textAlign: 'center',
  },
  errorIcon: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: DS.surfaceContainer,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    color: DS.charcoalBase,
    fontFamily: "'Manrope', sans-serif",
    fontWeight: 800,
    marginBottom: 8,
  },
};
