import React, { Component } from 'react'
import { View, Text } from 'react-native'
import CardComponent from '../../components/card/CardComponent'

class DashboardPage extends Component {
    render() {
        return (
           <View>
              <Text>
                  Hello Dashboard
              </Text>
              <CardComponent/>
           </View>
        )
     }
}

export default DashboardPage;