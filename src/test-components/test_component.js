import React, { Component } from 'react'
import { connect } from 'react-redux'

import { testPermissions } from './testActions'



class TestComponent extends Component {



    render() {



        const { testPermissions } = this.props;

        return (

            <div className="site-content ">
                <div className="site-content__center">

                    <h2 >Test Component</h2>
                    <button onClick={testPermissions} className="btn" >Testing Button</button>
                </div>
            </div>

        )

    }
}

const actions = {

    testPermissions
};

const mapStateToProps = (state, ownProps) => {

    return {

    }
}

export default connect(mapStateToProps, actions)(TestComponent)
