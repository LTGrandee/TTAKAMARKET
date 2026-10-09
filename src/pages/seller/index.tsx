import { Link, useParams } from 'react-router-dom';
import { Building2, CheckCircle, MessageSquare, Shield } from 'lucide-react';
import { Avatar, Badge, Button, Card } from '../../components/ui';
import { useAuth } from '../../context';

export function SellerProfilePage() {
  const { slug } = useParams();
  const { profile } = useAuth();
  const brandName = profile?.seller_brand_name || 'Property Partner';
  const isOwnerProfile = profile?.seller_profile_slug === slug;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Avatar src={profile?.avatar_url} name={brandName} size="xl" className="border-4 border-white/20" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">{brandName}</h1>
                <CheckCircle className="h-5 w-5 text-success-300" />
              </div>
              <p className="mt-1 text-primary-100">{profile?.seller_brand_type === 'business' ? 'TtakaMarket managed business profile' : 'TtakaMarket managed personal profile'}</p>
              <Badge variant="success" size="sm" className="mt-3">TtakaMarket-managed profile</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900">About {brandName}</h2>
            <p className="mt-3 text-gray-600">{profile?.seller_brand_bio || 'This profile is intended to be managed by TtakaMarket. Property details and supporting documents are subject to administrator review before publication.'}</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">Properties managed by TtakaMarket</h2>
            </div>
            <p className="text-sm text-gray-500">Approved property submissions will appear here when seller pages are connected to live marketplace data.</p>
            <Link to="/properties"><Button variant="outline" size="sm" className="mt-4">Browse properties</Button></Link>
          </Card>
        </div>

        <Card className="p-6 h-fit">
          <Shield className="h-6 w-6 text-primary-600 mb-3" />
          <h2 className="font-semibold text-gray-900">Managed seller profile</h2>
          <p className="mt-2 text-sm text-gray-500">TtakaMarket is designed to manage approvals, document handling and public property posts for this profile.</p>
          {isOwnerProfile && profile?.seller_chat_enabled && (
            <Link to="/messages"><Button variant="primary" className="w-full mt-5" leftIcon={<MessageSquare className="h-4 w-4" />}>Chat with seller</Button></Link>
          )}
          {!isOwnerProfile && <p className="mt-5 text-xs text-gray-400">Seller contact options are shown only when enabled and approved by TtakaMarket.</p>}
        </Card>
      </div>
    </div>
  );
}
