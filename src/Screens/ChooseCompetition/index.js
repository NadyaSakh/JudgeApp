import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { ActionContainer, ContentView, LoadingView } from './Components'
import { ErrorView } from '../../Components/ScreenError'

export const mapStateToProps = state => ({
    screenState: state.reducer.screenState,
    competitionInfo: state.reducer.competitionInfo
})

export const mapDispatchToProps = () => ({})

export class ChooseCompetition extends React.Component {
    static propTypes = {
        screenState: PropTypes.string.isRequired,
        onCompetitionPress: PropTypes.func,
        screenError: PropTypes.func
    }
    state = {
        competitionList: [
            {key: 'Enduro 2016'},
            {key: 'Enduro май 2017'},
            {key: 'Enduro июль 2017'},
            {key: 'Enduro август 2017'},
            {key: 'Enduro май 2018'},
            {key: 'Enduro июнь 2018'},
            {key: 'Enduro август 2018'},
            {key: 'Enduro Жара 2018'}
        ]
    }

    render = () => {
        return <ActionContainer
            screenState={this.props.screenState}
            contentView={
                <ContentView
                    text={'Выберите соревнование'}
                    data={this.state.competitionList}
                    onCompetitionPress={this.props.onCompetitionPress}/>
            }
            errorView={
                <ErrorView
                    text='Список соревнований не загружен.'/>
            }
            loadingView={
                <LoadingView
                    text={'Выберите соревнование'}/>
            }
        />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCompetition)