import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HomeHeaderPanel,
  HomeHeader,
  LogoPanel,
  SearchPanel,
  BlockPanel,
  ContentTitle,
  ContentTable,
  TableMorePanel,
} from './index.css'
import { parseDate } from '../../utils/date'
import Page from '../../components/Page'
import Header from '../../components/Header'
import Content from '../../components/Content'
import Footer from '../../components/Footer'
import {
  TableTitleRow,
  TableTitleItem,
  TableContentRow,
  TableContentItem,
  TableMinerContentItem,
} from '../../components/Table'
import HomeLogo from '../../asserts/logo_home.png'
import SearchLogo from '../../asserts/search.png'
import BlockHeightIcon from '../../asserts/block_height.png'
import TransactionIcon from '../../asserts/transactions.png'
import CellConsumedIcon from '../../asserts/cell_consumed.png'
import MinerIcon from '../../asserts/miner.png'
import TimestampIcon from '../../asserts/timestamp.png'
import MoreLeftIcon from '../../asserts/more_left.png'
import MoreRightIcon from '../../asserts/more_right.png'
import browserHistory from '../../routes/history'
import { fetchBlocks } from '../../http/fetcher'
import Block from '../../http/response/Block'

export default () => {
  const initBlocks: Block[] = []
  const [blocksData, setBlocksData] = useState(initBlocks)
  useEffect(() => {
    fetchBlocks().then(data => {
      setBlocksData(data as Block[])
    })
  }, [])

  return (
    <Page>
      <Header search={false} />
      <Content>
        <HomeHeaderPanel width={window.innerWidth}>
          <HomeHeader>
            <LogoPanel>
              <img src={HomeLogo} alt="home logo" />
              <div>CKB Testnet Explorer</div>
            </LogoPanel>
            <SearchPanel width={window.innerWidth}>
              <input placeholder="Block Heigth / Block Hash / TxHash / Address" />
              <div
                role="button"
                tabIndex={-1}
                onKeyPress={() => {}}
                onClick={() => {
                  browserHistory.push('/search/fail')
                }}
              >
                <img src={SearchLogo} alt="search logo" />
              </div>
            </SearchPanel>
          </HomeHeader>
        </HomeHeaderPanel>

        <BlockPanel width={window.innerWidth}>
          <ContentTitle>
            <div>Latest Blocks</div>
            <span />
          </ContentTitle>

          <ContentTable>
            <div>
              <TableTitleRow>
                <TableTitleItem image={BlockHeightIcon} title="Height" />
                <TableTitleItem image={TransactionIcon} title="Transactions" />
                <TableTitleItem image={CellConsumedIcon} title="Cell Consumed(B)" />
                <TableTitleItem image={MinerIcon} title="Miner" />
                <TableTitleItem image={TimestampIcon} title="Time" />
              </TableTitleRow>
              {blocksData.map((data: any) => {
                return (
                  <TableContentRow key={data.block_hash}>
                    <TableContentItem content={data.number} to={`block/${data.number}`} />
                    <TableContentItem content={data.transactions_count} />
                    <TableContentItem content={data.cell_consumed} />
                    <TableMinerContentItem content={data.miner_hash} />
                    <TableContentItem content={parseDate(data.timestamp)} />
                  </TableContentRow>
                )
              })}
            </div>
          </ContentTable>
          <TableMorePanel>
            <div>
              <img src={MoreLeftIcon} alt="more left" />
              <div>
                <Link className="table__more" to="block/list">
                  {`More`}
                </Link>
              </div>
              <img src={MoreRightIcon} alt="more right" />
            </div>
          </TableMorePanel>
        </BlockPanel>
      </Content>
      <Footer />
    </Page>
  )
}
