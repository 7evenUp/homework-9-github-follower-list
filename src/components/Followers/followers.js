import React, { PureComponent } from 'react';
import styles from './followers.module.css';
import {} from '../../modules/Followers';
import { connect } from 'react-redux';
import cx from 'classnames';

class Followers extends PureComponent {
  render() {
    const { isLoading, data } = this.props

    if (!data.length) return <p>Нет информации о подписчиках</p>

    return (
      isLoading ? <p>Загрузка информации о подписчиках</p> : (
        <div className={cx(styles.root, 't-followers')}>
          {data.map(item => {
            return (
              <div className={styles.follower} key={item.id}>
                <img className={styles.followerImg} src={item.avatar_url} alt="followerImg"/>
                <p className={styles.followerLogin}>{item.login}</p>
              </div>
            )
          })}
        </div>
      )
    )
  }
}

export default connect(state => ({
  isLoading: state.followers.isLoading,
  data: state.followers.data
}))(Followers);
