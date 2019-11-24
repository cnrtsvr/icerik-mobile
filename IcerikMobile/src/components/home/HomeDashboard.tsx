import React from 'react';
import {Col, Row, Grid} from 'react-native-easy-grid';
import HomeStatusCard from './HomeStatusCard';
import axios from '../../axios';
import { NavigationStackProp } from "react-navigation-stack";

export interface Props {
  navigation: NavigationStackProp<any>
}

export interface State {
  activeJobs: {
    writer: number,
    editor: number,
    masterEditor: number
  },
  finishedJobs: {
    writer: number,
    editor: number,
    masterEditor: number
  }
}

class HomeDashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeJobs: {
        writer: 0,
        editor: 0,
        masterEditor: 0
      },
      finishedJobs: {
        writer: 0,
        editor: 0,
        masterEditor: 0
      }
    }
  }

  componentDidMount(): void {
    this.getDashboardData();
  }

  getDashboardData() {
    axios.get('v1/writer/dashboard')
        .then(response => {
          const { active_jobs, finished_jobs } = response.data;

          this.setState({
            activeJobs: {
              writer: active_jobs.writer ? active_jobs.writer.length : 0,
              editor: active_jobs.editor ? active_jobs.editor.length : 0,
              masterEditor: active_jobs.master_editor ? active_jobs.master_editor.length : 0
            },
            finishedJobs: {
              writer: finished_jobs.writer || 0,
              editor: finished_jobs.editor || 0,
              masterEditor: finished_jobs.master_editor || 0
            }
          })
        });
  }

  goToJobList(userTypeId: number, finished: boolean) {
    const { navigation } = this.props;
    if(!finished) {
      navigation.navigate('ActiveJobList', {
        userTypeId
      });
    } else {
      navigation.navigate('FinishedJobList', {
        userTypeId
      });
    }
  }

  render() {
    const { activeJobs, finishedJobs } = this.state;

    return (
        <Grid>
          <Row>
            <Col>
              <HomeStatusCard icon={'pencil-alt'} iconColor={'#eeeeee'}
                              onPress={() => this.goToJobList(3, false)}
                              userTitleColor={'#c2185b'}
                              userTitle={'Yazar Olarak'} contentTitle={'Devam Eden'}
                              count={activeJobs.writer}/>
            </Col>
            <Col>
              <HomeStatusCard icon={'copy'} iconColor={'#c8e6c9'}
                              onPress={() => this.goToJobList(3, true)}
                              userTitleColor={'#c2185b'}
                              userTitle={'Yazar Olarak'} contentTitle={'Biten'}
                              count={finishedJobs.writer}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <HomeStatusCard icon={'user-secret'} iconColor={'#eeeeee'}
                              onPress={() => this.goToJobList(4, false)}
                              userTitleColor={'#ffa000'}
                              userTitle={'Editör Olarak'} contentTitle={'Devam Eden'}
                              count={activeJobs.editor}/>
            </Col>
            <Col>
              <HomeStatusCard icon={'copy'} iconColor={'#c8e6c9'}
                              onPress={() => this.goToJobList(4, true)}
                              userTitleColor={'#ffa000'}
                              userTitle={'Editör Olarak'} contentTitle={'Biten'}
                              count={finishedJobs.editor}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <HomeStatusCard icon={'user-tie'} iconColor={'#eeeeee'}
                              onPress={() => this.goToJobList(10, false)}
                              userTitleColor={'#1976d2'}
                              userTitle={'Master Editör Olarak'} contentTitle={'Devam Eden'}
                              count={activeJobs.editor}/>
            </Col>
            <Col>
              <HomeStatusCard icon={'copy'} iconColor={'#c8e6c9'}
                              onPress={() => this.goToJobList(10, true)}
                              userTitleColor={'#1976d2'}
                              userTitle={'Master Editör Olarak'} contentTitle={'Biten'}
                              count={finishedJobs.editor}/>
            </Col>
          </Row>
        </Grid>
    )
  }
}

export default HomeDashboard;
