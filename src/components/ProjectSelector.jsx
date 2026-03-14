import { useState, useMemo } from 'react'
import { shuffle } from '../lib/utils'

const allProjects = [
  'my-project-1', 'my-project-01', 'my-project-1-dev', 'my-project-1-staging',
  'my-project-1-prod', 'my-project-1-prod-copy', 'my-project-1-prod-old',
  'my-project-1-prod-backup', 'my-project-1-test', 'my-project-1-temp',
  'my-project-1-archive', 'my-project-2', 'my-project-1-prod-v2',
  'my-project-1-PROD', 'my-project-11', 'my-project-1-final',
  'my-project-1-final-final', 'my-project-1-canary', 'my-project-1-beta',
  'my-project-1-alpha', 'my-project-1-release', 'my-project-1-hotfix',
  'my-project-1-migration', 'my-project-1-legacy', 'my-project-01-prod',
  'my-project-1-v3', 'my-project-1-stable', 'my-project-1-nightly',
  'my-project-1-sandbox', 'my-project-1-demo', 'my-project-1-qa',
  'my-project-1-uat', 'my-project-1-perf', 'my-project-1-dr',
]

const orgs = ['My Organization', 'Other Org', 'Personal', 'Shared Org']

export default function ProjectSelector({ open, onSelect, addToast }) {
  const { projects, correctId, recentProjects, starredProjects } = useMemo(() => {
    const shuffled = shuffle(allProjects)
    const correctIdx = Math.floor(Math.random() * shuffled.length)
    const correct = shuffled[correctIdx]
    const projectList = shuffled.map(id => ({
      id,
      name: id,
      org: orgs[Math.floor(Math.random() * orgs.length)]
    }))
    const wrongOnes = projectList.filter(p => p.id !== correct)
    const recent = shuffle(wrongOnes).slice(0, 5)
    const starred = shuffle(wrongOnes.filter(p => !recent.includes(p))).slice(0, 4)
    return { projects: projectList, correctId: correct, recentProjects: recent, starredProjects: starred }
  }, [])

  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('recent')

  if (!open) return null

  const source = tab === 'recent' ? recentProjects : tab === 'starred' ? starredProjects : projects
  const filtered = source.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gborder w-[500px] max-h-[600px] flex flex-col">
      <div className="p-5 border-b border-gborder">
        <h2 className="text-lg font-medium text-gdark mb-3">Select a project</h2>
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-gborder rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gblue"
        />
      </div>

      <div className="flex border-b border-gborder">
        {['recent', 'starred', 'all'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${
              tab === t ? 'text-gblue border-b-2 border-gblue' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t === 'recent' ? 'Recent' : t === 'starred' ? '⭐ Starred' : `All (${projects.length})`}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">No projects found</div>
        ) : (
          filtered.map(project => (
            <button
              key={project.id}
              onClick={() => {
                if (project.id === correctId) {
                  onSelect(project.id)
                } else {
                  addToast('APIs not enabled for this project. Select a different project.', 'error')
                }
              }}
              className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-blue-50 transition-colors border-b border-gborder/50 text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded bg-glight flex items-center justify-center text-xs text-gray-500 font-mono">
                {project.name.slice(-2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gdark truncate">{project.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{project.org}</div>
              </div>
              <div className="text-xs text-gray-400">ID: {project.id}</div>
            </button>
          ))
        )}
      </div>

      <div className="p-4 border-t border-gborder bg-gray-50 text-xs text-gray-400 text-center">
        Only projects with Generative Language API enabled can create API keys.
        <br/>
        <span className="text-gray-300">Hint: Check the "All" tab and scroll carefully.</span>
      </div>
    </div>
  )
}
