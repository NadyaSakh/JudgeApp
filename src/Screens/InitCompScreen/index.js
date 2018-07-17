import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { ActionContainer } from '../../Components/ActionContainer'
import { ContentView, LoadingView } from './Components'
import { ErrorView } from '../../Components/ScreenError'
import { requestCompetitionAction } from './Actions'
import { LOG } from '../../Utils/logger'

export const mapStateToProps = state => ({//...state.reducer//когда вся ифа из стора редьюсера
    screenState: state.reducer.screenState,
    competitionName: state.reducer.competitionName,
    data: state.reducer.data
})

export const mapDispatchToProps = dispatch => ({
    loadCurrentCompetitionData: () => dispatch(requestCompetitionAction())
})

export class CurrentCompetition extends React.Component {
    static propTypes = {
        screenState: PropTypes.string.isRequired,
        competitionName: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
        loadCurrentCompetitionData: PropTypes.func,
        data: PropTypes.array

    }

    constructor(props) {
        super(props)
        LOG('const init', props)
    }

    componentDidMount() {
        LOG('MOUNT_init_Comp', 'MOUNT')
        this.props.loadCurrentCompetitionData()
    }

    // loadCompetitionData = () => {
    //     this.props.loadCurrentCompetitionData()
    // }

    render = () => {
        return <ActionContainer
            componentState={this.props.screenState}
            contentView={
                <ContentView
                    text={'Информация о соревновании'}
                    data={this.props.data}
                    name={this.props.competitionName}
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