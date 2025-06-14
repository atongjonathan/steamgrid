import { createFileRoute } from '@tanstack/react-router'
import Banner from './-components/Banner/Banner'
import SgSlider from './-components/SGSlider';

export const Route = createFileRoute('/_app/')({
  component: RouteComponent,
})

function RouteComponent() {
  document.title = `StreamGrid | Home`

  const limit = 10
  const shuffle = true

  const sliders = [
    {
      title: 'Recently Added',
      params: { ordering: '-created', limit },
    },
    {
      title: 'Latest Release',
      params: { ordering: '-releaseDate', limit },
    },
    {
      title: 'Action',
      params: { genre: 'Action', limit, shuffle },
    },
    {
      title: 'Romance',
      params: { genre: 'Romance', limit, shuffle },
    },
    {
      title: 'Horror',
      params: { genre: 'Horror', limit, shuffle },
    },
    {
      title: 'Animation',
      params: { genre: 'Animation', limit, shuffle },
    },
    {
      title: 'Documentary',
      params: { genre: 'Documentary', limit, shuffle },
    },
    {
      title: 'Top Rated',
      params: { ordering: '-rating_star', limit },
    },
  ]

  return (
    <>
      <Banner />
      <div className="pl-6 pr-2">
        {sliders.map(({ title, params }) => (
          <SgSlider key={title} title={title} params={params} />
        ))}
      </div>
    </>
  )
}
