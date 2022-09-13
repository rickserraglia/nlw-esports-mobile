import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
	text: string;
}

function Button({ text }: ButtonProps) {
	return (
		<TouchableOpacity>
			<Text>{text}</Text>
		</TouchableOpacity>
	);
}

export default function App() {
	return (
		<View style={styles.container}>
			<Text>Hello React Native!</Text>

			<Button text="Texto Botão 1" />
			<Button text="Texto Botão 2" />
			<Button text="Texto Botão 3" />
			<Button text="Hello World Button" />

			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
