import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { NeonInput, NeonButton } from "./NeonProtocol"

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      navigate("/", { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12 border-l-4 border-primary-fixed-dim pl-4">
          <h1 className="headline-lg text-primary-fixed-dim uppercase tracking-widest">SYSTEM</h1>
          <h2 className="headline-md text-secondary-fixed">LOGIN_PROTOCOL_V2.0</h2>
          <p className="code-snippet text-on-surface-variant mt-2">AUTHENTICATION_REQUIRED</p>
        </div>

        {/* Login Card */}
        <div className="ascii-border bg-surface-container-low border-primary-fixed-dim p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <NeonInput
              type="email"
              label="EMAIL_ADDRESS"
              placeholder="ENTER_EMAIL_ADDR..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Input */}
            <NeonInput
              type="password"
              label="SECURITY_PASSWORD"
              placeholder="ENTER_PASSWORD..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Error Message */}
            {error && (
              <div className="p-3 ascii-border border-error bg-surface-container-low">
                <p className="text-error code-snippet text-[11px]">
                  ✗ AUTH_FAILED: {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <NeonButton
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "AUTHENTICATING..." : "LOGIN_SYSTEM"}
            </NeonButton>
          </form>

          {/* Footer Info */}
          <div className="mt-6 pt-4 border-t border-outline-variant">
            <p className="code-snippet text-[10px] text-outline text-center">
              [ SECURE_CONNECTION_ESTABLISHED ]
            </p>
            <p className="code-snippet text-[10px] text-outline text-center mt-1">
              ENCRYPTION: AES-256 | SESSION_TIMEOUT: 30MIN
            </p>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-8 text-center code-snippet text-[9px] text-on-surface-variant">
          <p>SYSTEM_ID: HRM_V2.0 | BUILD: 2024.10.27</p>
        </div>
      </div>
    </div>
  )
}