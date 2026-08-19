export function useDevice() {
	const isMobile = ref(false)
	const screenWidth = ref(window.innerWidth)

	const checkDevice = () => {
		screenWidth.value = window.innerWidth
		isMobile.value = window.innerWidth < 768 // 小于768px认为是移动端
	}

	onMounted(() => {
		checkDevice()
		window.addEventListener("resize", checkDevice)
	})

	onUnmounted(() => {
		window.removeEventListener("resize", checkDevice)
	})

	return {
		isMobile,
		screenWidth,
	}
}
