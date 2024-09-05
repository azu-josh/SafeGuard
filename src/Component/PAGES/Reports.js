import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

const Reports = () => {
  const [dataUsage, setDataUsage] = useState(null);
  const [breachData, setBreachData] = useState(null);
  const [appUsageData, setAppUsageData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Replace URLs with your actual API endpoints
      const usageUrl = 'https://cloud.mongodb.com/data-usage';
      const breachUrl = 'https://cloud.mongodb.com//data-breaches';
      const distributionUrl = 'https://cloud.mongodb.com//app-usage';

      const [usageResponse, breachResponse, distributionResponse] = await Promise.all([
        axios.get(usageUrl),
        axios.get(breachUrl),
        axios.get(distributionUrl),
      ]);

      setDataUsage(usageResponse.data);
      setBreachData(breachResponse.data);
      setAppUsageData(distributionResponse.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {dataUsage && (
          <View>
            <Text style={styles.headerText}>Data Usage Over Time</Text>
            <LineChart
              data={dataUsage}
              width={screenWidth - 20}
              height={220}
              chartConfig={chartConfig}
              style={styles.chartStyle}
            />
          </View>
        )}

        {breachData && (
          <View>
            <Text style={styles.headerText}>Data Breach Incidents</Text>
            <BarChart
              data={breachData}
              width={screenWidth - 20}
              height={220}
              chartConfig={chartConfig}
              style={styles.chartStyle}
            />
          </View>
        )}

        {appUsageData && (
          <View>
            <Text style={styles.headerText}>App Data Usage Distribution</Text>
            <PieChart
              data={appUsageData}
              width={screenWidth - 20}
              height={220}
              chartConfig={chartConfig}
              accessor="usage"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              style={styles.chartStyle}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
    marginLeft: 10,
  },
});

export default Reports;
