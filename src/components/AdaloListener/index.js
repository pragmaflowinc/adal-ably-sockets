import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import * as Ably from 'ably'

const AdaloListener = (props) => {
	const { apiKey, clientId, editor, channelName, subscriptionKey, onMessage } = props
	const [ably, setAbly] = useState()
	const [channel, setChannel] = useState()
	useEffect(() => {
		if (!editor) {
			debugger
			const AblyRealtime = new Ably.Realtime({
				key: apiKey,
				clientId
			})
			setAbly(AblyRealtime)
		}
	}, [apiKey, clientId, editor])

	useEffect(() => {
		if (ably) {
			debugger
			setChannel(ably.channels.get(channelName));
		}
	}, [ably])

	useEffect(() => {
		if (channel && subscriptionKey && onMessage) {
			debugger
			channel.subscribe(subscriptionKey, (packet) => {
				debugger
				onMessage(
				packet.data.value1,
				packet.data.value2,
				packet.data.value3,
				packet.data.value4,
				packet.data.value5
			)})
		}
	}, [channel, subscriptionKey, onMessage])

	return(
		<View style={styles.wrapper}>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}
})

export default AdaloListener
