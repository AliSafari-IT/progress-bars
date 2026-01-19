import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { HomePage } from './pages/HomePage'
import { ComponentsPage } from './pages/ComponentsPage'
import { LinearPlayground } from './pages/LinearPlayground'
import { Examples } from './pages/Examples'
import { VisualGrid } from './pages/VisualGrid'
import { Accessibility } from './pages/Accessibility'
import { Tokens } from './pages/Tokens'
import { Roadmap } from './pages/Roadmap'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <BrowserRouter basename="/progress-bars/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="linear" element={<LinearPlayground />} />
          <Route path="examples" element={<Examples />} />
          <Route path="visual-grid" element={<VisualGrid />} />
          <Route path="a11y" element={<Accessibility />} />
          <Route path="tokens" element={<Tokens />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="components" element={<ComponentsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
