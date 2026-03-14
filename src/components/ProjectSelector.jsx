import { useState } from 'react'

const projects = [
  { id: 'my-project-1', name: 'my-project-1', org: 'My Organization' },
  { id: 'my-project-01', name: 'my-project-01', org: 'My Organization' },
  { id: 'my-project-1-dev', name: 'my-project-1-dev', org: 'My Organization' },
  { id: 'my-project-1-staging', name: 'my-project-1-staging', org: 'My Organization' },
  { id: 'my-project-1-prod', name: 'my-project-1-prod', org: 'My Organization' },
  { id: 'my-project-1-prod-copy', name: 'my-project-1-prod-copy', org: 'My Organization' },
  { id: 'my-project-1-prod-old', name: 'my-project-1-prod-old', org: 'My Organization' },
  { id: 'my-project-1-prod-backup', name: 'my-project-1-prod-backup', org: 'My Organization' },
  { id: 'my-project-1-test', name: 'my-project-1-test', org: 'My Organization' },
  { id: 'my-project-1-temp', name: 'my-project-1-temp', org: 'My Organization' },
  { id: 'my-project-1-archive', name: 'my-project-1-archive', org: 'My Organization' },
  { id: 'my-project-2', name: 'my-project-2', org: 'My Organization' },
  { id: 'my-project-1-prod-v2', name: 'my-project-1-prod-v2', org: 'My Organization' },
  { id: 'my-project-1-PROD', name: 'my-project-1-PROD', org: 'Other Org' },
  { id: 'my-project-11', name: 'my-project-11', org: 'Other Org' },
  { id: 'my-project-1-final', name: 'my-project-1-final', org: 'My Organization' },
  { id: 'my-project-1-final-final', name: 'my-project-1-final-final', org: 'My Organization' },
]

const recentProjects = projects.slice(0, 5) // None of the recent ones are correct

export default function ProjectSelector({ open, onSelect }) {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('recent') // recent | all

  if (!open) return null

  const filtered = tab === 'recent'
    ? recentProjects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    : projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gborder w-[500px] max-h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gborder">
        <h2 className="text-lg font-medium text-gdark mb-3">Select a project</h2>
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-gborder rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gblue"
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gborder">
        <button
          onClick={() => setTab('recent')}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
            tab === 'recent' ? 'text-gblue border-b-2 border-gblue' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Recent
        </button>
        <button
          onClick={() => setTab('all')}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
            tab === 'all' ? 'text-gblue border-b-2 border-gblue' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          All ({projects.length})
        </button>
      </div>

      {/* Project list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">No projects found</div>
        ) : (
          filtered.map(project => (
            <button
              key={project.id}
              onClick={() => onSelect(project.id)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gborder/50 text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded bg-glight flex items-center justify-center text-xs text-gray-500 font-mono">
                {project.name.slice(-2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gdark truncate">{project.name}</div>
                <div className="text-xs text-gray-400">{project.org}</div>
              </div>
              <div className="text-xs text-gray-400">ID: {project.id}</div>
            </button>
          ))
        )}
      </div>

      {/* Hint text at bottom */}
      <div className="p-3 border-t border-gborder bg-gray-50 text-xs text-gray-400 text-center">
        Only projects with Generative Language API enabled can create API keys.
        <br/>
        <span className="text-gray-300">Hint: Check the "All" tab and scroll carefully.</span>
      </div>
    </div>
  )
}
