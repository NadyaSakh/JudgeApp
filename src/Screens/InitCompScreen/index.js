import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { ActionContainer } from '../../Components/ActionContainer'
import { ContentView, LoadingView } from './Components'
import { ErrorView } from '../../Components/ScreenError'
import { requestCompetitionAction } from './Actions'

export const mapStateToProps = state => ({//...state.reducer//когда вся ифа из стора редьюсера
    screenState: state.reducer.screenState,
})

export const mapDispatchToProps = dispatch => ({
    loadCurrentCompetitionData: () => dispatch(requestCompetitionAction())
})

export class CurrentCompetition extends React.Component {
    static propTypes = {
        screenState: PropTypes.string.isRequired,
        loadCurrentCompetitionData: PropTypes.func
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.loadCurrentCompetitionData()
    }

    render = () => {
        return <ActionContainer
            componentState={this.props.screenState}
            contentView={
                <ContentView
                    text={'Загрузка информации выполнена.'}
                />
            }
            errorView={
                <ErrorView
                    text='Список соревнований не загружен.'
                    onRepeat={this.props.loadCurrentCompetitionData}
                />
            }
            loadingView={
                <LoadingView
                    text={'Загрузка информации о соревновании. Пожалуйста, подождите.'}/>
            }
        />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentCompetition)