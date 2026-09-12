'use client';

import { useEffect, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  title?: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    notes: '',
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/contacts');
      if (res.ok) {
        const data = await res.json();
        setContacts(data.contacts);
      }
    } catch (err) {
      console.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          title: '',
          notes: '',
        });
        fetchContacts();
      }
    } catch (err) {
      console.error('Failed to create contact');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="text-center py-12">Loading...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            Add Contact
          </button>
        </div>

        {showForm && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Create New Contact</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">First Name *</label>
                  <input
                    name="firstName"
                    required
                    className="input"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="label">Last Name *</label>
                  <input
                    name="lastName"
                    required
                    className="input"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input
                    name="phone"
                    className="input"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Company</label>
                  <input
                    name="company"
                    className="input"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="label">Title</label>
                  <input
                    name="title"
                    className="input"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="label">Notes</label>
                <textarea
                  name="notes"
                  className="input"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
              <div className="flex space-x-3">
                <button type="submit" className="btn-primary">
                  Create Contact
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div key={contact.id} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {contact.firstName} {contact.lastName}
                  </h3>
                  {contact.title && <p className="text-sm text-gray-600">{contact.title}</p>}
                  {contact.company && <p className="text-sm font-medium text-gray-700">{contact.company}</p>}
                </div>
              </div>
              <div className="mt-4 space-y-1">
                {contact.email && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {contact.email}
                  </p>
                )}
                {contact.phone && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Phone:</span> {contact.phone}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
