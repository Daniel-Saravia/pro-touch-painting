import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/lib/i18n'
import Header from '../Header'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}))

const renderWithI18n = (component: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      {component}
    </I18nextProvider>
  )
}

describe('Header', () => {
  it('renders the logo', () => {
    renderWithI18n(<Header />)
    const logo = screen.getByAltText('Pro Touch Painting & Drywall')
    expect(logo).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderWithI18n(<Header />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Gallery')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders mobile menu toggle', () => {
    renderWithI18n(<Header />)
    const mobileToggle = screen.getByLabelText('Toggle mobile menu')
    expect(mobileToggle).toBeInTheDocument()
  })
})