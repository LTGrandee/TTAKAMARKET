import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, FileText, MapPin, MessageSquare, Search, Shield } from 'lucide-react';
import { Badge, Button, Card, Loading } from '../../components/ui';
import { useAuth } from '../../context';
import { getRentalLabel } from '../../lib/utils';

const reviewSteps = [
  { title: 'Property submitted', description: 'Your details and supporting documents have been received.', Icon: FileText },
  { title: 'Document verification', description: 'TtakaMarket administrators review ownership and identity documents.', Icon: Shield },
  { title: 'Site survey', description: 'Our team confirms the property location and condition on site.', Icon: MapPin },
  { title: 'Publication and management', description: 'Once approved, TtakaMarket publishes and manages enquiries for the property.', Icon: CheckCircle },
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
            {isSubmitter ? 'Property Submission Status' : `Welcome back, ${profile.full_name.split(' ')[0]}`}
          </h1>
          <p className="mt-1 text-gray-500">
            {isSubmitter
              ? 'TtakaMarket administrators handle verification, site surveys, advertising, and buyer enquiries.'
              : 'Browse verified properties, save favourites, and contact owners or lawful representatives.'}
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
                  <p className="mt-1 text-sm text-primary-700">Submit a land or housing property for sale or rent. You do not need to create or manage a public listing yourself.</p>
                  <Link to="/properties/new"><Button size="sm" variant="primary" className="mt-4">Submit a Property</Button></Link>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Managed seller page</h2>
                  <p className="mt-1 text-sm text-gray-500">TtakaMarket creates and controls your public personal or business brand page. You can request posts, but our administrators approve every public update.</p>
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
                <span className="text-xs text-gray-500 self-center">Performance reporting is shown above and is managed by TtakaMarket.</span>
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
                <p className="mt-1 text-sm text-gray-500">Choose whether buyers should chat with you or an authorised lawful representative after TtakaMarket publishes the property.</p>
                <Link to="/messages"><Button variant="outline" size="sm" className="mt-4">Open Messages</Button></Link>
              </Card>
              <Card className="p-6">
                <Search className="h-6 w-6 text-primary-600 mb-3" />
                <h2 className="font-semibold text-gray-900">Browse the marketplace</h2>
                <p className="mt-1 text-sm text-gray-500">Find verified properties while our team reviews your submission.</p>
                <Link to="/properties"><Button variant="outline" size="sm" className="mt-4">Browse Properties</Button></Link>
              </Card>
            </div>
          </>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <Search className="h-6 w-6 text-primary-600 mb-3" />
              <h2 className="font-semibold text-gray-900">Find a property</h2>
              <p className="mt-1 text-sm text-gray-500">Browse land and housing listings verified and managed by TtakaMarket.</p>
              <Link to="/properties"><Button variant="primary" size="sm" className="mt-4">Browse Properties</Button></Link>
            </Card>
            <Card className="p-6">
              <MessageSquare className="h-6 w-6 text-accent-500 mb-3" />
              <h2 className="font-semibold text-gray-900">Chat with the right contact</h2>
              <p className="mt-1 text-sm text-gray-500">Ask questions through TtakaMarket’s chat channel and connect with the owner or lawful representative.</p>
              <Link to="/messages"><Button variant="outline" size="sm" className="mt-4">Open Messages</Button></Link>
            </Card>
            {profile.rental_preferences && (
              <Card className="p-6 md:col-span-2">
                <h2 className="font-semibold text-gray-900">Your rental matching profile</h2>
                <p className="mt-1 text-sm text-gray-500">Use these preferences to help TtakaMarket recommend suitable rentals.</p>
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
