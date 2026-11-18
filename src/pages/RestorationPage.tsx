import { Link } from 'react-router-dom';
import { AlertTriangle, BadgeCheck, ClipboardCheck, Leaf, MapPin, Sprout, Users } from 'lucide-react';
import { Badge, Card } from '../components/ui';
import type { RestorationProject } from '../lib/types';

const projects: RestorationProject[] = [
  {
    id: 'rest-1',
    title: 'Wetland-edge buffer restoration',
    location: 'Nakivubo catchment',
    district: 'Kampala',
    area_hectares: 2.5,
    status: 'assessed',
    risk_categories: ['wetland'],
    consent_confirmed: true,
    evidence_status: 'documented',
    partner_name: 'Community restoration partner',
    description: 'A consented pilot project for stabilising degraded wetland-edge land and monitoring native vegetation.',
    last_updated: '2026-11-10',
  },
  {
    id: 'rest-2',
    title: 'Degraded riverbank recovery',
    location: 'Busega corridor',
    district: 'Wakiso',
    area_hectares: 1.2,
    status: 'implementing',
    risk_categories: ['riverbank'],
    consent_confirmed: true,
    evidence_status: 'pending',
    partner_name: 'District environmental partner',
    description: 'A planned implementation project requiring geotagged progress evidence and independent verification.',
    last_updated: '2026-11-08',
  },
];

const statusLabels: Record<RestorationProject['status'], string> = {
  identified: 'Identified',
  assessed: 'Assessed',
  partner_matched: 'Partner matched',
  implementing: 'Implementing',
  monitoring: 'Monitoring',
  completed: 'Completed',
};

export function RestorationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-success-800 px-4 py-10 text-white sm:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
              <Sprout className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-success-100">Land Restoration Hub</p>
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold sm:text-4xl">Restore degraded land with consent, evidence and follow-through</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-success-100 sm:text-base">
            Explore screened projects and restoration partners. Hectares and progress are reported only when supporting evidence is documented and independently verified.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { Icon: ClipboardCheck, title: 'Identify & assess', text: 'Confirm the location, degradation risk and project scope.' },
            { Icon: Users, title: 'Match partners', text: 'Connect consenting landholders with qualified implementation partners.' },
            { Icon: BadgeCheck, title: 'Evidence & monitor', text: 'Record progress and verify hectares before reporting outcomes.' },
          ].map(({ Icon, title, text }) => (
            <Card key={title} className="p-5">
              <Icon className="h-6 w-6 text-success-700" />
              <h2 className="mt-3 font-semibold text-gray-900">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">{text}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-success-700">Pilot projects</p>
            <h2 className="mt-1 text-xl font-bold text-gray-900">Restoration opportunities</h2>
          </div>
          <Badge variant="neutral">Proof of work required</Badge>
        </div>

        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge variant="success" size="sm">{statusLabels[project.status]}</Badge>
                  <h3 className="mt-3 text-lg font-bold text-gray-900">{project.title}</h3>
                </div>
                <Leaf className="h-6 w-6 flex-shrink-0 text-success-600" />
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500"><MapPin className="h-4 w-4" />{project.location}, {project.district}</p>
              <p className="mt-3 text-sm leading-6 text-gray-600">{project.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Area assessed</p>
                  <p className="mt-1 font-bold text-gray-900">{project.area_hectares} ha</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Evidence</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">{project.evidence_status === 'independently_verified' ? 'Independently verified' : project.evidence_status === 'documented' ? 'Documented' : 'Pending evidence'}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                <span className="text-xs text-gray-500">Partner: {project.partner_name}</span>
                <Link to="/help" className="text-sm font-semibold text-success-700 hover:text-success-800">Enquire about a project</Link>
              </div>
            </article>
          ))}
        </div>

        <Card className="mt-8 border-warning-200 bg-warning-50 p-5">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-warning-700" />
            <div>
              <h2 className="font-semibold text-warning-900">Project evidence and environmental limits</h2>
              <p className="mt-1 text-sm leading-6 text-warning-800">
                Screening does not replace permits, EIAs or title checks. Restoration listings require landholder consent and documented implementation evidence; hectares are not counted until independently verified.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
