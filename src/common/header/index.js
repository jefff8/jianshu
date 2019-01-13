import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { actionCreators } from './store';

import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  SeachInfo,
  SeachInfoTitle,
  SeachInfoSwitch,
  SeachInfoList,
  SearchInfoItem,
  Addition,
  Button,
  SearchWrapper
} from './style';

class Header extends Component {

  getListArea() {
    const { focused, list, page, totalPage, handleMouseEnter, handleMouseLeave, mouseIn, handleChangePage} = this.props;
    const newList = list.toJS();
    const pageList = [];

    if (newList.length) {
      for( let i = (page - 1) * 10; i < page * 10; i++ ) {
        pageList.push(
          <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
        )
      }
    }

    if (focused || mouseIn) {
      return(
        <SeachInfo 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SeachInfoTitle>
            热门搜索
            <SeachInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}>
              <i ref={(icon) => {this.spinIcon = icon}} className='iconfont spin'>
               &#xe606;
              </i>
              换一批
            </SeachInfoSwitch>
          </SeachInfoTitle>
          <SeachInfoList>
            {pageList}
          </SeachInfoList>
        </SeachInfo>
      )
    }else {
      return null;
    }
  }

  render() {
    const { focused, handleFocusClick, handleBlurClick, list } = this.props;
    return(
      <HeaderWrapper>
        <Logo />
        <Nav>
          <NavItem className='left active'>首页</NavItem>
          <NavItem className='left'>下载App</NavItem>
          <NavItem className='right'>登陆</NavItem>
          <NavItem className='right'>
            <i className="iconfont">&#xe636;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in={ focused }
              timeout={200}
              classNames="slide"
            >
              <NavSearch 
                className={ focused ? 'focused' : ''}
                onFocus={() => handleFocusClick(list)}
                onBlur={handleBlurClick}
              ></NavSearch>
            </CSSTransition>
            <i className={ focused ? 'iconfont focused zoom' : 'iconfont zoom'}>
              &#xe62d;
            </i>
            {this.getListArea()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Button className='writting'>
            <i className="iconfont">&#xe615;</i>
            写文章
          </Button>
          <Button className='reg'>注册</Button>
        </Addition>
      </HeaderWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    totalPage: state.getIn(['header', 'totalPage']),
    page: state.getIn(['header', 'page']),
    mouseIn: state.getIn(['header', 'mouseIn'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleFocusClick(list) {
      (list.size === 0) && dispatch(actionCreators.getList());
      dispatch(actionCreators.searchFocus());
    },
    handleBlurClick() {
      dispatch(actionCreators.searchBlur());
    },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter());
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave());
    },
    handleChangePage(page, totalPage, spin) {
      let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
      if (originAngle) {
        originAngle = parseInt(originAngle, 10);
      }else {
        originAngle = 0;
      }
      spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)'; 

      if (page < totalPage) {
        dispatch(actionCreators.changePage(page+1));
      }else {
        dispatch(actionCreators.changePage(1));
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);