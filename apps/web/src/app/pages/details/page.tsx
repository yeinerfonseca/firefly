import React from 'react'
import styles from './page.module.css'

export default function DetailsPage() {
  const artworkUrl: string =
    'https://media.rawg.io/media/resize/1280/-/games/09b/09b41c1a2c5761c5b1772a4ae238bb0e.jpg'

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div
          className={styles.artwork}
          style={
            {
              '--artwork-url': `url("${artworkUrl}")`,
            } as React.CSSProperties
          }
        ></div>
      </div>

      <section className="max-w-[960px] m-auto flex gap-[4.8rem] text-white">
        <div className="flex-1">
          <h1 className="font-bold text-lg">Silent Hill 2</h1>
          <div></div>
        </div>
        <div className="flex-1">Gallery</div>
      </section>
    </>
  )
}
