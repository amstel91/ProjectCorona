import { View, Text ,StyleSheet,ScrollView } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import React, { Component } from 'react';
import Api from '../../api/Api'
import AppUtils from '../../utils/AppUtils'

class NewsPage extends Component{

    constructor(props){
        super(props)
        this.state={
            articles:[],
            totalResults:0
        }
    }

    translateToLocalDate(date){
        if(date && date.trim()!=""){
           let tDate=new Date(date);
           console.log("Date returned by API:",date)
           console.log("Date returned by API in Local Timezone:",tDate.toLocaleString())
           return AppUtils.getTimeSince(tDate);
        }
        return "";
     }

    componentDidMount(){
        Api.getNews("us").then(res=>{
            console.log(res);
            this.setState(
                {
                    articles:res.articles,
                    totalResults:res.totalResults
                }
            )
        })
    }

    generateCards(){
        let self=this;
        let cards=this.state.articles.map(function (card) {
            return (
                <Card>
                    <CardImage 
                    source={{uri: card.urlToImage}} 
                    title={card.title}
                    />
                    <CardTitle
                    subtitle={self.translateToLocalDate(card.publishedAt)}
                    />
                    <CardContent text={card.description} />
                    <CardAction 
                    separator={true} 
                    inColumn={false}>
                    <CardButton
                        onPress={() => {}}
                        title="Share"
                        color="#FEB557"
                    />
                    <CardButton
                        onPress={() => {}}
                        title="Explore"
                        color="#FEB557"
                    />
                    </CardAction>
                </Card>
            );
         });
        return <ScrollView>{cards}</ScrollView>
    }

    render(){
        
        return(
            this.generateCards()
        )
    }
}

const styles = StyleSheet.create({
 
});

export default NewsPage;