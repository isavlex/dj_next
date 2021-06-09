import Link from 'next/link'
import isEmpty from '../../utils/utils'
import Button from '../UI/Button/Button'

export default function ReviewsList(props) {
  return (
    <ol className="list-group">
      {isEmpty(props.reviews) ? (
        Object.keys(props.reviews).map((reviewName, index) => {
          return (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
            >
              {/* <Input
              type={'checkbox'}
              inputClass="btn-check"
              onChange={props.inputCheckboxHandler.bind(this, reviewName)}
            /> */}

              <input
                type="checkbox"
                className="btn=check"
                onChange={props.inputCheckboxHandler.bind(this, reviewName)}
                checked={props.reviews[reviewName].checked}
              />
              <Link href={`/review/[id]`} as={`/review/${reviewName}`}>
                {props.reviews[reviewName].name}
              </Link>
              <Button
                addMod="remove"
                onClick={props.removeItemHandler.bind(this, reviewName)}
              />
            </li>
          )
        })
      ) : (
        <p>Нет отзывов!</p>
      )}
    </ol>
  )
}
