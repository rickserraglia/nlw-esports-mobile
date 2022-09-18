import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { CheckCircle } from 'phosphor-react-native';
import { useState } from 'react';
import { ActivityIndicator, Alert, Modal, ModalProps, Text, TouchableOpacity, View } from 'react-native';

import { THEME } from '../../theme';
import { Heading } from '../Heading';
import { styles } from './styles';

interface DuoMatchProps extends ModalProps {
	discord: string;
	onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: DuoMatchProps) {
	const [isCopying, setIsCopying] = useState(false);

	const handleDiscordUserToClipboard = async () => {
		setIsCopying(true);
		await Clipboard.setStringAsync(discord);
		Alert.alert(
			'Discord Copiado!',
			'Usuário copiado para a area de transferência, basta colar no Discord para adicionar o seu Duo.'
		);
		setIsCopying(false);
	};

	return (
		<Modal animationType="fade" transparent statusBarTranslucent {...rest}>
			<View style={styles.container}>
				<View style={styles.content}>
					<TouchableOpacity onPress={onClose} style={styles.closeIcon}>
						<MaterialIcons
							name="close"
							size={20}
							color={THEME.COLORS.CAPTION_500}
						/>
					</TouchableOpacity>

					<CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

					<Heading
						title="Let's play!"
						subtitle="Agora é só começar a jogar!"
						style={{ alignItems: 'center', marginTop: 24 }}
					/>

					<Text style={styles.label}>Adicione seu discord</Text>

					<TouchableOpacity
						onPress={handleDiscordUserToClipboard}
						disabled={isCopying}
						style={styles.discordButton}
					>
						<Text style={styles.discord}>
							{isCopying ? (
								<ActivityIndicator color={THEME.COLORS.PRIMARY} />
							) : (
								discord
							)}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
