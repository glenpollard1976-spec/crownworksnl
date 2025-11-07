"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Upload, Send, Trash2, Plus, FileText, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validateEmail, validatePhone, sanitizeContact, validateCSVFile, checkRateLimit } from "@/lib/security";

export default function EmailListPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "" });
  const fileInputRef = useRef(null);

  // Parse CSV file with security validation
  const parseCSV = (text) => {
    // Limit file size processing
    if (text.length > 5 * 1024 * 1024) { // 5MB limit
      throw new Error('File is too large. Maximum size is 5MB.');
    }
    
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    // Limit number of lines processed
    const maxLines = 10000;
    if (lines.length > maxLines) {
      lines.splice(maxLines);
    }

    // Try to detect if first line is header
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().slice(0, 50));
    const hasHeader = headers.some(h => h.includes('email') || h.includes('name'));

    const startIndex = hasHeader ? 1 : 0;
    const contacts = [];

    for (let i = startIndex; i < lines.length; i++) {
      // Limit line length
      if (lines[i].length > 1000) continue;
      
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, '').slice(0, 500));
      
      // Try to find email, name, phone columns
      let email = "";
      let name = "";
      let phone = "";

      if (hasHeader) {
        const emailIndex = headers.findIndex(h => h.includes('email'));
        const nameIndex = headers.findIndex(h => h.includes('name') && !h.includes('email'));
        const phoneIndex = headers.findIndex(h => h.includes('phone') || h.includes('tel'));

        if (emailIndex >= 0 && values[emailIndex]) email = values[emailIndex].trim();
        if (nameIndex >= 0 && values[nameIndex]) name = values[nameIndex].trim();
        if (phoneIndex >= 0 && values[phoneIndex]) phone = values[phoneIndex].trim();
      } else {
        // Assume format: email, name, phone or name, email, phone
        if (values.length >= 1) {
          // Check if first value is email
          if (values[0].includes('@')) {
            email = values[0].trim();
            if (values[1]) name = values[1].trim();
            if (values[2]) phone = values[2].trim();
          } else {
            name = values[0].trim();
            if (values[1] && values[1].includes('@')) email = values[1].trim();
            if (values[2] && values[2].includes('@')) email = values[2].trim();
            if (values[1] && !values[1].includes('@')) phone = values[1].trim();
            if (values[2] && !values[2].includes('@')) phone = values[2].trim();
          }
        }
      }

      // Validate and sanitize before adding
      if (email && validateEmail(email)) {
        const sanitized = sanitizeContact({ name, email, phone });
        if (sanitized.email) {
          contacts.push(sanitized);
        }
      }
    }

    return contacts;
  };

  // Handle file upload with security validation
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file
    const fileValidation = validateCSVFile(file);
    if (!fileValidation.isValid) {
      alert(fileValidation.error);
      event.target.value = ''; // Reset file input
      return;
    }

    // Rate limiting
    if (!checkRateLimit('file_upload', 10, 60000)) {
      alert('Too many uploads. Please wait a minute.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const importedContacts = parseCSV(text);
        
        // Limit total contacts
        const maxContacts = 10000;
        const currentCount = contacts.length;
        
        if (currentCount + importedContacts.length > maxContacts) {
          const allowed = maxContacts - currentCount;
          importedContacts.splice(allowed);
          alert(`Imported ${allowed} contacts (reached maximum of ${maxContacts}).`);
        }
        
        // Merge with existing contacts, avoiding duplicates
        setContacts(prev => {
          const existingEmails = new Set(prev.map(c => c.email.toLowerCase()));
          const newContacts = importedContacts.filter(c => !existingEmails.has(c.email.toLowerCase()));
          return [...prev, ...newContacts];
        });

        const newCount = importedContacts.filter(c => !contacts.some(ex => ex.email.toLowerCase() === c.email.toLowerCase())).length;
        const duplicateCount = importedContacts.length - newCount;
        
        alert(`Imported ${importedContacts.length} contacts. ${newCount} new, ${duplicateCount} duplicates skipped.`);
      } catch (error) {
        alert(`Error importing file: ${error.message}`);
      }
    };

    reader.onerror = () => {
      alert('Error reading file. Please try again.');
    };

    if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
      reader.readAsText(file);
    } else {
      alert('Please upload a CSV or TXT file');
      event.target.value = '';
    }
  };

  // Add manual contact with validation
  const handleAddContact = () => {
    // Validate email
    if (!newContact.email || !validateEmail(newContact.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Validate phone if provided
    if (newContact.phone && !validatePhone(newContact.phone)) {
      alert('Please enter a valid phone number');
      return;
    }

    // Sanitize and validate contact
    const sanitized = sanitizeContact(newContact);
    
    if (!sanitized.email) {
      alert('Please enter a valid email address');
      return;
    }

    // Check for duplicates
    if (contacts.some(c => c.email.toLowerCase() === sanitized.email.toLowerCase())) {
      alert('This email already exists in your list');
      return;
    }

    // Limit total contacts
    if (contacts.length >= 10000) {
      alert('Maximum of 10,000 contacts allowed. Please delete some contacts first.');
      return;
    }

    setContacts([...contacts, sanitized]);
    setNewContact({ name: "", email: "", phone: "" });
    setShowAddForm(false);
  };

  // Delete contact
  const handleDeleteContact = (email) => {
    setContacts(contacts.filter(c => c.email !== email));
    setSelectedContacts(selectedContacts.filter(e => e !== email));
  };

  // Toggle contact selection
  const toggleContact = (email) => {
    setSelectedContacts(prev =>
      prev.includes(email)
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  // Select all/none
  const toggleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map(c => c.email));
    }
  };

  // Send bulk emails with security checks
  const handleSendBulkEmail = async () => {
    if (selectedContacts.length === 0) {
      alert('Please select at least one contact');
      return;
    }

    // Rate limiting
    if (!checkRateLimit('bulk_email', 5, 300000)) { // 5 per 5 minutes
      alert('Too many email sends. Please wait 5 minutes.');
      return;
    }

    // Validate inputs
    if (!emailSubject || emailSubject.trim().length < 3) {
      alert('Please enter a subject (at least 3 characters)');
      return;
    }

    if (!emailBody || emailBody.trim().length < 10) {
      alert('Please enter a message (at least 10 characters)');
      return;
    }

    // Sanitize inputs
    const sanitizedSubject = emailSubject.trim().slice(0, 200);
    const sanitizedBody = emailBody.trim().slice(0, 10000);

    // Limit batch size
    const maxBatchSize = 50;
    const contactsToEmail = selectedContacts.slice(0, maxBatchSize);
    
    if (selectedContacts.length > maxBatchSize) {
      alert(`Sending to first ${maxBatchSize} contacts. Select smaller batches for better deliverability.`);
    }

    setIsSending(true);
    setSendStatus(null);

    try {
      // Create mailto links for each selected contact
      const selectedContactData = contacts.filter(c => contactsToEmail.includes(c.email));
      
      // Validate all emails before proceeding
      const validContacts = selectedContactData.filter(c => validateEmail(c.email));
      
      if (validContacts.length === 0) {
        alert('No valid email addresses found in selected contacts');
        setIsSending(false);
        return;
      }
      
      // For bulk sending, we'll create a mailto with BCC
      // Note: Most email clients limit BCC recipients, so we'll create individual mailto links
      const emailList = validContacts.map(contact => {
        const subject = encodeURIComponent(sanitizedSubject);
        const personalizedBody = sanitizedBody.replace(/\{name\}/g, contact.name || 'there');
        const body = encodeURIComponent(
          `Hello ${contact.name || 'there'},\n\n${personalizedBody}\n\nBest regards,\nCrownWorksNL`
        );
        return `mailto:${contact.email}?subject=${subject}&body=${body}`;
      });

      // Open first email (user can send and then we'll show next)
      if (emailList.length > 0) {
        window.open(emailList[0], '_blank');
        
        // Store remaining emails for batch sending
        if (emailList.length > 1) {
          const remaining = emailList.slice(1);
          localStorage.setItem('pendingEmails', JSON.stringify(remaining));
          localStorage.setItem('emailSubject', sanitizedSubject);
          localStorage.setItem('emailBody', sanitizedBody);
          alert(`Opening first email. After sending, refresh this page to continue with the remaining ${remaining.length} emails.`);
        }
      }

      setSendStatus({ success: true, message: `Prepared ${validContacts.length} emails` });
    } catch (error) {
      setSendStatus({ success: false, message: 'Error preparing emails: ' + error.message });
    } finally {
      setIsSending(false);
    }
  };

  // Export contacts to CSV
  const handleExportCSV = () => {
    const csv = [
      ['Name', 'Email', 'Phone'].join(','),
      ...contacts.map(c => [c.name, c.email, c.phone].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Email List Manager</h1>
          <p className="text-zinc-600">Manage your contacts and send bulk emails</p>
        </div>

        {/* Import/Add Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Import Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".csv,.txt"
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-2xl"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import from CSV
              </Button>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="rounded-2xl"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Contact Manually
              </Button>
              {contacts.length > 0 && (
                <Button
                  onClick={handleExportCSV}
                  className="rounded-2xl"
                  variant="outline"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export to CSV
                </Button>
              )}
            </div>

            {/* Manual Add Form */}
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 bg-zinc-50 rounded-lg space-y-3"
              >
                <div className="grid md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    required
                    className="px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddContact} className="rounded-2xl">
                    Add Contact
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAddForm(false);
                      setNewContact({ name: "", email: "", phone: "" });
                    }}
                    variant="outline"
                    className="rounded-2xl"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Contacts List */}
        {contacts.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Contacts ({contacts.length})
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    onClick={toggleSelectAll}
                    variant="outline"
                    className="rounded-2xl text-sm"
                  >
                    {selectedContacts.length === contacts.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {contacts.map((contact, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-3 rounded-lg border ${
                      selectedContacts.includes(contact.email)
                        ? 'bg-indigo-50 border-indigo-300'
                        : 'bg-white border-zinc-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.email)}
                      onChange={() => toggleContact(contact.email)}
                      className="w-5 h-5"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{contact.name || contact.email}</div>
                      <div className="text-sm text-zinc-600">{contact.email}</div>
                      {contact.phone && (
                        <div className="text-xs text-zinc-500">{contact.phone}</div>
                      )}
                    </div>
                    <Button
                      onClick={() => handleDeleteContact(contact.email)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bulk Email Section */}
        {contacts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>
                Send Bulk Email ({selectedContacts.length} selected)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Subject</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Enter email subject"
                    className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Message</label>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="Enter your message here..."
                    rows={8}
                    className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                  <p className="text-xs text-zinc-500 mt-1">
                    Tip: Use {"{name}"} to personalize (e.g., "Hello {name},...")
                  </p>
                </div>
                {sendStatus && (
                  <div
                    className={`p-3 rounded-lg flex items-center gap-2 ${
                      sendStatus.success
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {sendStatus.success ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    <span>{sendStatus.message}</span>
                  </div>
                )}
                <Button
                  onClick={handleSendBulkEmail}
                  disabled={isSending || selectedContacts.length === 0}
                  className="rounded-2xl w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSending ? 'Preparing...' : `Send to ${selectedContacts.length} Contact(s)`}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {contacts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Mail className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No contacts yet</h3>
              <p className="text-zinc-600 mb-4">
                Import contacts from a CSV file or add them manually to get started
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

