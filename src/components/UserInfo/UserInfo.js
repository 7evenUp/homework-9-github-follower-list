import React, { PureComponent } from 'react';
import styles from './UserInfo.module.css';

import { connect } from 'react-redux';

class UserInfo extends PureComponent {
  render() {
    const { isLoading, data } = this.props
    
    if (!data) return <p>Нет информации о пользователе</p>

    return (
      isLoading ? <p>Загрузка информации о пользователе</p> : (
        <div className={styles.root}>
          <div className={styles.imageWrapper}>
            <img src={data.avatar_url} alt="user info" className={styles.image}/>
          </div>
          <div>
            <p className="t-user-name">{data.name}</p>
            <p className="t-user-bio">{data.bio}</p>
          </div>
        </div>
      )
    )
  }
}

export default connect(state => ({
  isLoading: state.user.isLoading,
  data: state.user.data
}))(UserInfo);
