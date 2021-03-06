import React from 'react'
import styled from 'styled-components'
import Content from '../../components/Content'
import Search from '../../components/Search'

const SearchPanel = styled.div`
  margin-top: ${(props: { width: number }) => (350 * props.width) / 1920}px;
  margin-bottom: ${(props: { width: number }) => (440 * props.width) / 1920}px;
`

const SearchContent = styled.div`
  font-size: 20px;
  max-width: 423px;
  margin: 0 auto;
  margin-top: 39px;
  text-align: center;
`

export default () => {
  return (
    <Content>
      <SearchPanel width={window.innerWidth} className="container">
        <Search opacity />
        <SearchContent>Opps! Your search did not match any record. Please try different keywords~</SearchContent>
      </SearchPanel>
    </Content>
  )
}
