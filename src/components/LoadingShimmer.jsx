export default function LoadingShimmer({ height = '1rem', width = '100%', borderRadius = '8px' }) {
  return (
    <div style={{
      height, width, borderRadius,
      background: 'linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.4s infinite linear',
    }} />
  )
}
