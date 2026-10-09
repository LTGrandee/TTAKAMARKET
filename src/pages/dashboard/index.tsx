import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, FileText, MapPin, MessageSquare, Search, Shield } from 'lucide-react';
import { Badge, Button, Card, Loading } from '../../components/ui';
import { useAuth } from '../../context';
import { getRentalLabel } from '../../lib/utils';

const reviewSteps = [
  { title: 'Submit property details', description: 'Share the property information and supporting documents for review.', Icon: FileText },
  { title: 'Administrator review', description: 'The planned review includes ownership, tenure and identity documents.', Icon: Shield },
  { title: 'Site survey', description: 'A site survey can be coordinated to review location, access and condition.', Icon: MapPin },
  { title: 'Publication decision', description: 'TtakaMarket decides whether to approve and manage the public listing.', Icon: CheckCircle },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  if (loading || !profile) return <Loading fullScreen />;

  const isSubmitter = profile.user_type === 'owner' || profile.user_type === 'agent' || profile.user_type === 'developer';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {isSubmitter ? 'Your property submissions' : `Welcome back, ${profile.full_name.split(' ')[0]}`}
          </h1>
          <p className="mt-1 text-gray-500">
            {isSubmitter
              ? 'Submit land or built property for administrator review and managed publication.'
              : 'Explore sample listings to buy, rent, lease or book for a short stay. Account tools shown here are a prototype preview.'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {isSubmitter ? (
          <>
            <Card className="p-6 border-primary-200 bg-primary-50">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-primary-900">No active submission yet</h2>
                  <p className="mt-1 text-sm text-primary-700">Preview a submission for land, housing, short stays, commercial or storage property. The live review and publishing service is not connected yet.</p>
                  <Link to="/properties/new"><Button size="sm" variant="primary" className="mt-4">Submit a Property</Button></Link>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Managed seller page</h2>
                  <p className="mt-1 text-sm text-gray-500">Preview the planned TtakaMarket-managed personal or business page. Approval and public posting are not active in this prototype.</p>
                  {profile.seller_profile_enabled && profile.seller_profile_slug && (
                    <Link to={`/seller/${profile.seller_profile_slug}`} className="inline-flex mt-3 text-sm font-semibold text-primary-600 hover:text-primary-700">View public seller page</Link>
                  )}
                </div>
                <Badge variant={profile.seller_profile_enabled ? 'success' : 'neutral'}>{profile.seller_profile_enabled ? 'Enabled' : 'Not enabled'}</Badge>
              </div>
              {profile.seller_profile_enabled && (
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="rounded-lg bg-gray-50 p-3"><p className="text-xl font-bold text-gray-900">0</p><p className="text-xs text-gray-500">Post requests</p></div>
                  <div className="rounded-lg bg-gray-50 p-3"><p className="text-xl font-bold text-gray-900">0</p><p className="text-xs text-gray-500">Published posts</p></div>
                  <div className="rounded-lg bg-gray-50 p-3"><p className="text-xl font-bold text-gray-900">0</p><p className="text-xs text-gray-500">Profile views</p></div>
                </div>
              )}
              <div className="flex flex-wrap gap-3 mt-5">
                <Link to="/properties/new"><Button size="sm" variant="primary">Request a property post</Button></Link>
                <Link to="/messages"><Button size="sm" variant="outline" leftIcon={<MessageSquare className="h-4 w-4" />}>Optional customer chats</Button></Link>
                <span className="text-xs text-gray-500 self-center">Figures shown here are sample prototype data.</span>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">What happens after submission?</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {reviewSteps.map(({ title, description, Icon }, index) => (
                  <div key={title} className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{index + 1}. {title}</p>
                      <p className="mt-1 text-sm text-gray-500">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <MessageSquare className="h-6 w-6 text-accent-500 mb-3" />
                <h2 className="font-semibold text-gray-900">Owner communication</h2>
                <p className="mt-1 text-sm text-gray-500">Set a preferred enquiry contact for a property submission. Contact routing is part of the planned service.</p>
                <Link to="/messages"><Button variant="outline" size="sm" className="mt-4">Open Messages</Button></Link>
              </Card>
              <Card className="p-6">
                <Search className="h-6 w-6 text-primary-600 mb-3" />
                <h2 className="font-semibold text-gray-900">Browse the marketplace</h2>
                <p className="mt-1 text-sm text-gray-500">Browse sample listings while the marketplace prototype is in development.</p>
                <Link to="/properties"><Button variant="outline" size="sm" className="mt-4">Browse Properties</Button></Link>
              </Card>
            </div>
          </>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <Search className="h-6 w-6 text-primary-600 mb-3" />
              <h2 className="font-semibold text-gray-900">Find a property</h2>
              <p className="mt-1 text-sm text-gray-500">Browse land, housing, commercial and storage listings for sale, rent or lease.</p>
              <Link to="/properties"><Button variant="primary" size="sm" className="mt-4">Browse Properties</Button></Link>
            </Card>
            <Card className="p-6">
              <MessageSquare className="h-6 w-6 text-accent-500 mb-3" />
              <h2 className="font-semibold text-gray-900">Chat with the right contact</h2>
              <p className="mt-1 text-sm text-gray-500">Use the prototype chat screen to view a sample enquiry with a property contact.</p>
              <Link to="/messages"><Button variant="outline" size="sm" className="mt-4">Open Messages</Button></Link>
            </Card>
            {profile.rental_preferences && (
              <Card className="p-6 md:col-span-2">
                <h2 className="font-semibold text-gray-900">Your rental matching profile</h2>
                <p className="mt-1 text-sm text-gray-500">These saved preferences are a prototype preview; rental recommendations are not active.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {[profile.rental_preferences.accommodation_type, profile.rental_preferences.duration, profile.rental_preferences.purpose, profile.rental_preferences.living_arrangement, profile.rental_preferences.tenancy_arrangement, profile.rental_preferences.payment_method].map((value) => <Badge key={value} variant="secondary">{getRentalLabel(value)}</Badge>)}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
