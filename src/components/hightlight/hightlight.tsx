import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';

export function Hightlight(props: { str: string }): Element {
  const { str } = props
  const searchQuery: string | null = useSelector((state: RootState) => state.data.searchQuery);
  let result = ''


  if (!searchQuery) {
    result = str
  }

  else if (searchQuery) {
    const regexp = new RegExp(searchQuery, 'ig')
    const matchValue = str.match(regexp)


    return str.split(regexp).map((s, index, array) => {


      if (index < array.length - 1) {
        const c = matchValue.shift()

        return <React.Fragment>{s}<span className='hightlight'>{c}</span></React.Fragment>
      }

      result = s
    })
  }


  return <span>result</span>
}
