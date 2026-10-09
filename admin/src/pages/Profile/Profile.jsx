import { Helmet } from 'react-helmet-async'
import { FiLogOut, FiShield, FiUser } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth.js'
import { useState } from 'react'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user, logout, changePassword } = useAuth()
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [isSaving, setIsSaving] = useState(false)
  const savePassword = async (event) => {
    event.preventDefault()
    if (isSaving) return
    if (passwords.newPassword !== passwords.confirmPassword) return toast.error('New passwords do not match')
    setIsSaving(true)
    try {
      await changePassword({ currentPassword: passwords.currentPassword, newPassword: passwords.newPassword })
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
      toast.success('Password changed. Other sessions have been signed out.')
    } catch (error) { toast.error(error.response?.data?.message || 'Unable to change password') }
    finally { setIsSaving(false) }
  }

  return (
    <>
      <Helmet>
        <title>Profile | R S PAPAL GROUP Admin</title>
      </Helmet>

      <div className="settings-page profile-page">
        <header className="cms-page-heading">
          <div>
            <p>Account</p>
            <h1>Profile</h1>
            <span>View current admin profile and account session details.</span>
          </div>
        </header>

        <section className="profile-card">
          <div className="profile-avatar">{user?.name?.charAt(0) || 'A'}</div>
          <div>
            <p>Super Admin</p>
            <h2>{user?.name || 'Super Admin'}</h2>
            <span>{user?.email || '-'}</span>
          </div>
        </section>

        <div className="settings-form">
          <section className="settings-card">
            <div className="settings-card-heading">
              <p>Identity</p>
              <h2>Account Details</h2>
            </div>
            <div className="lead-detail-grid">
              <span>Name</span><strong>{user?.name || 'Super Admin'}</strong>
              <span>Email</span><strong>{user?.email || '-'}</strong>
              <span>Role</span><strong>{user?.role || 'SUPER_ADMIN'}</strong>
              <span>Status</span><strong>{user?.isActive === false ? 'Inactive' : 'Active'}</strong>
            </div>
          </section>

          <section className="settings-card">
            <div className="settings-card-heading">
              <p>Security</p>
              <h2>Session</h2>
            </div>
            <div className="profile-security">
              <FiShield />
              <p>Sign out when you finish managing enquiries. Changing your password signs out your other sessions.</p>
            </div>
            <button type="button" className="primary-button" onClick={logout}>
              <FiLogOut /> Logout
            </button>
          </section>
        </div>

        <form className="settings-card" onSubmit={savePassword}>
          <div className="settings-card-heading"><p>Security</p><h2>Change password</h2></div>
          <label htmlFor="current-password">Current password</label>
          <input id="current-password" type="password" autoComplete="current-password" required value={passwords.currentPassword} onChange={event => setPasswords(current => ({ ...current, currentPassword: event.target.value }))} />
          <label htmlFor="new-password">New password · at least 12 characters</label>
          <input id="new-password" type="password" autoComplete="new-password" required minLength={12} value={passwords.newPassword} onChange={event => setPasswords(current => ({ ...current, newPassword: event.target.value }))} />
          <label htmlFor="confirm-password">Confirm new password</label>
          <input id="confirm-password" type="password" autoComplete="new-password" required minLength={12} value={passwords.confirmPassword} onChange={event => setPasswords(current => ({ ...current, confirmPassword: event.target.value }))} />
          <button type="submit" className="primary-button" disabled={isSaving}>{isSaving ? 'Saving…' : 'Update password'}</button>
        </form>

        <section className="settings-card">
          <div className="settings-card-heading">
            <p>Access</p>
            <h2>Permissions</h2>
          </div>
          <div className="profile-permissions">
            <span><FiUser /> Lead Management</span>
            <span><FiShield /> Super Admin</span>
          </div>
        </section>
      </div>
    </>
  )
}

export default Profile
