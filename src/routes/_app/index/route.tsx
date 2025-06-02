import { createFileRoute } from '@tanstack/react-router'
import Banner from '../-components/Banner/Banner'
import SgSlider from './-components/SGSlider';

export const Route = createFileRoute('/_app/')({
  component: RouteComponent,
})

function RouteComponent() {
  document.title = `StreamGrid | Home`;

  let limit = 10
  const shuffle = true

  const sortedByDate = {
    ordering: "-releaseDate",
    limit

  }
  const RecentlyAdded = {
    ordering: "-created",
    limit

  }

  const sortedByRatingStar = {
    ordering: "-rating_star",
    limit
  }

  const actionMovies = {
    genre: "Action",
    limit,
    shuffle

  }
  const animation = {
    genre: "Animation",
    limit,
    shuffle

  }
  const horror = {
    genre: "Horror",
    limit,
    shuffle

  }
  const documentary = {
    genre: "Documentary",
    limit,
    shuffle

  }
  const romance = {
    genre: "Romance",
    limit,
    shuffle

  }
  return <>
    <Banner />
    <SgSlider params={RecentlyAdded} title='Recently Added' />
    <SgSlider params={sortedByDate} title='Latest Release' />
    <SgSlider params={actionMovies} title='Action' />
    <SgSlider params={romance} title='Romance' />
    <SgSlider params={horror} title='Horror' />
    <SgSlider params={animation} title='Animation' />
    <SgSlider params={documentary} title='Documentary' />
    <SgSlider params={sortedByRatingStar} title='Top Rated' />  </>
}
