export const MOCK_USER = {
  id: 'user-1',
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'alex@example.com',
  phone: '(555) 012-3456',
}

export const MOCK_ACCOUNTS = [
  {
    id: 'acc-checking',
    type: 'Checking',
    bank: 'Chase Bank',
    last4: '4291',
    balance: 3847.52,
    available: 3600.00,
    icon: '🏦',
  },
  {
    id: 'acc-savings',
    type: 'Savings',
    bank: 'Chase Bank',
    last4: '8834',
    balance: 12450.00,
    available: 12450.00,
    icon: '💰',
  },
]

export const MOCK_CONTACTS = [
  { id: 'c1', name: 'Sarah Kim',       initials: 'SK', color: '#7B2FBE', recent: true },
  { id: 'c2', name: 'Marcus Johnson',  initials: 'MJ', color: '#E63946', recent: true },
  { id: 'c3', name: 'Priya Patel',     initials: 'PP', color: '#2DC653', recent: false },
  { id: 'c4', name: 'Jordan Lee',      initials: 'JL', color: '#F4A261', recent: false },
  { id: 'c5', name: 'Emma Rodriguez',  initials: 'ER', color: '#1D8AFF', recent: false },
  { id: 'c6', name: 'David Chen',      initials: 'DC', color: '#4361EE', recent: false },
]

export const MOCK_BANKS = [
  { id: 'chase',   name: 'Chase',           emoji: '🏦', bg: '#EEF6FF' },
  { id: 'bofa',    name: 'Bank of America', emoji: '🏛️', bg: '#FFF1F1' },
  { id: 'wells',   name: 'Wells Fargo',     emoji: '🔴', bg: '#FFF4F0' },
  { id: 'citi',    name: 'Citibank',        emoji: '🌐', bg: '#F0F7FF' },
  { id: 'usbank',  name: 'US Bank',         emoji: '💼', bg: '#F0F5FF' },
  { id: 'cap1',    name: 'Capital One',     emoji: '💳', bg: '#FFF0F0' },
]

export const MOCK_BILLS = [
  { id: 'b1', name: 'Electric Bill',  due: 'Mar 15', amount: 87.43,  icon: '⚡' },
  { id: 'b2', name: 'Internet',       due: 'Mar 20', amount: 49.99,  icon: '📡' },
  { id: 'b3', name: 'Water Bill',     due: 'Mar 25', amount: 34.12,  icon: '💧' },
  { id: 'b4', name: 'Streaming Plus', due: 'Apr 1',  amount: 15.99,  icon: '📺' },
]

export const MOCK_TRANSACTIONS = [
  { id: 't1', type: 'sent',     name: 'Sarah Kim',     amount: -25.00,  date: 'Today',     time: '2:30 PM' },
  { id: 't2', type: 'received', name: 'Marcus Johnson', amount: 150.00, date: 'Yesterday', time: '11:15 AM' },
  { id: 't3', type: 'bill',     name: 'Electric Bill',  amount: -87.43, date: 'Mar 1',     time: '9:00 AM' },
  { id: 't4', type: 'sent',     name: 'Jordan Lee',    amount: -40.00,  date: 'Feb 28',    time: '6:45 PM' },
]

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}
