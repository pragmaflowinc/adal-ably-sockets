import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import * as Ably from 'ably'

const AdaloSender = (props) => {
	const { apiKey, clientId, editor, channelName, subscriptionKey, value1, value2, value3, value4, value5, send, onSuccess, onError } = props
	const [ably, setAbly] = useState()
	const [channel, setChannel] = useState()
	useEffect(() => {
		if (!editor) {
			const AblyRealtime = new Ably.Realtime({
				key: apiKey,
				clientId
			})
			setAbly(AblyRealtime)
		}
	}, [apiKey, clientId, editor])

	useEffect(() => {
		if (ably) {
			setChannel(ably.channels.get(channelName));
		}
	}, [ably])

	useEffect(() => {
		if (channel && subscriptionKey && send === 'true') {
			channel.publish(subscriptionKey, {
				value1,
				value2,
				value3,
				value4,
				value5
			}, (error) => {
				if (error) {
					if (onError) {
						onError()
					}
				} else {
					if (onSuccess) {
						onSuccess()
					}
				}
			})
		}
	}, [channel, subscriptionKey, value1, value2, value3, value4, value5, send])

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

export default AdaloSender
