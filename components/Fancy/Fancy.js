import {useRef, useEffect} from 'react'
import ReactDOMServer from 'react-dom/server'
import isEmpty from '../../utils/utils'
import {Fancybox, Carousel as FancyCarousel} from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox.css'

function GalleryBox(props) {
  const delegate = props.delegate || '[data-fancybox]'

  useEffect(() => {
    const opts = props.options || {}

    Fancybox.bind(delegate, opts)

    return () => {
      Fancybox.destroy()
    }
  }, [])

  return <>{props.children}</>
}

function Carousel(props) {
  const wrapper = useRef(null)

  useEffect(() => {
    const opts = props.options || {}
    opts.slides = props.items.map((rev) => {
      return {html: getHtml(rev)}
    })

    const instance = new FancyCarousel(wrapper.current, opts)

    return () => {
      instance.destroy()
    }
  }, [])

  function defineSocial(link) {
    let result
    const social = {
      vk: 'vk.com',
      ok: 'ok.ru',
      facebook: 'facebook.com',
      instagram: 'instagram.com',
    }

    Object.keys(social).forEach((net) => {
      const index = link.indexOf(social[net])
      if (index >= 0) {
        result = net
      }
    })

    return result
  }

  function getHtml(rev) {
    const socClass = defineSocial(rev.link)
    const [img] = props.images.filter(img => img._id === rev._id)

    return ReactDOMServer.renderToStaticMarkup(
      <div className="reviews__review">
        <p className="reviews__text">{rev.review}</p>
        <div className="reviews__person">
          <div className="reviews__wrap">
            <img className="reviews__img" src={img.image} />
          </div>
          <h3 className="reviews__name">{rev.name}</h3>
          <p className="reviews__event">{rev.event}</p>
          <a href={rev.link} target="blank">
            <div className={socClass}></div>
          </a>
        </div>
      </div>
    )
  }

  return <div className={`carousel ${props.class || ''}`} ref={wrapper}></div>
}

export {GalleryBox, Carousel}
