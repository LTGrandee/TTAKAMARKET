import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Send, ArrowLeft, User } from 'lucide-react';
import { Button, Input, Avatar, Card, EmptyState, Loading } from '../../components/ui';
import type { Conversation, Message, Profile } from '../../lib/supabase';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context';
import { formatRelativeTime, cn } from '../../lib/utils';

export function MessagesPage() {
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (!user) { navigate('/login'); return; } fetchConversations(); }, [user, navigate]);
  useEffect(() => { if (conversationId && conversations.length > 0) { const conv = conversations.find((c) => c.id === conversationId); if (conv) { setSelectedConversation(conv); fetchMessages(conversationId); } } }, [conversationId, conversations]);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function fetchConversations() {
    setLoading(true);
    try {
      const mockConversations: Conversation[] = [{ id: '1', participant1_id: user?.id || 'mock', participant2_id: 'owner-1', last_message_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() }];
      setConversations(mockConversations);
      if (!conversationId) navigate(`/messages/${mockConversations[0].id}`);
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  }

  async function fetchMessages(convId: string) {
    const mockMessages: Message[] = [
      { id: '1', conversation_id: convId, sender_id: 'owner-1', content: 'Hello! Thank you for your interest in my property. How can I help you?', is_read: true, created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
      { id: '2', conversation_id: convId, sender_id: user?.id || 'mock', content: 'Hi! I would like to know if the property is still available, and if so, when I could come for a viewing.', is_read: true, created_at: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString() },
      { id: '3', conversation_id: convId, sender_id: 'owner-1', content: 'Yes, the property is still available. You can come for a viewing this Saturday at 10 AM. Does that work for you?', is_read: false, created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
    ];
    setMessages(mockMessages);
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;
    setSending(true);
    const newMsg: Message = { id: Date.now().toString(), conversation_id: selectedConversation.id, sender_id: user?.id || 'mock', content: newMessage, is_read: false, created_at: new Date().toISOString() };
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage('');
    setSending(false);
  };

  if (loading) return <Loading fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex h-[calc(100vh-200px)]">
            <div className={cn('w-full border-r border-gray-200 overflow-y-auto', 'md:w-80 md:block', conversationId ? 'hidden md:block' : 'block')}>
              <div className="p-4 border-b border-gray-200"><Input placeholder="Search conversations..." leftIcon={<User className="h-4 w-4" />} /></div>
              {conversations.length === 0 ? (<div className="p-6"><EmptyState title="No conversations" description="Start browsing properties and contact owners" action={<Button variant="primary" onClick={() => navigate('/properties')}>Browse Properties</Button>} /></div>) : (
                <div className="divide-y divide-gray-100">
                  {conversations.map((conv) => {
                    const isSelected = conv.id === conversationId;
                    return (
                      <button key={conv.id} onClick={() => { navigate(`/messages/${conv.id}`); setSelectedConversation(conv); fetchMessages(conv.id); }} className={cn('w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors', isSelected && 'bg-primary-50 border-l-4 border-l-primary-600')}>
                        <Avatar size="md" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between"><p className="font-medium text-gray-900 truncate">Property Owner</p><span className="text-xs text-gray-400">{formatRelativeTime(conv.last_message_at)}</span></div>
                          <p className="text-sm text-gray-500 truncate">Click to view conversation</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className={cn('flex-1 flex flex-col', conversationId ? 'block' : 'hidden md:flex')}>
              {selectedConversation ? (
                <>
                  <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                    <button onClick={() => navigate('/messages')} className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><ArrowLeft className="h-5 w-5" /></button>
                    <Avatar size="md" />
                    <div><p className="font-medium text-gray-900">Property Owner</p><p className="text-sm text-gray-500">Kololo, Kampala</p></div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => {
                      const isOwn = message.sender_id === user?.id;
                      return (
                        <div key={message.id} className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}>
                          <div className={cn('max-w-[70%] rounded-2xl px-4 py-2', isOwn ? 'bg-primary-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-900 rounded-bl-none')}>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            <p className={cn('text-xs mt-1', isOwn ? 'text-primary-200' : 'text-gray-400')}>{formatRelativeTime(message.created_at)}</p>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                    <div className="flex gap-3"><Input placeholder="Type your message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1" /><Button type="submit" variant="primary" loading={sending}><Send className="h-4 w-4" /></Button></div>
                  </form>
                </>
              ) : (<div className="flex-1 flex items-center justify-center"><EmptyState icon={<User className="h-12 w-12" />} title="Select a conversation" description="Choose a conversation from the list" /></div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
