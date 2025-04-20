import PageContainer from "@/components/page-container";
import ScrollableButtonContainer from "../../components/ScrollableButtonContainer";

const Playground = () => {
    return (
        <PageContainer>
            <h1 className="text-2xl font-bold mb-4">滚动按钮演示</h1>
            <ScrollableButtonContainer>
                {[...Array(20)].map((_, index) => (
                    <button
                        key={index}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        按钮 {index + 1}
                    </button>
                ))}
            </ScrollableButtonContainer>
        </PageContainer>
    );
};

export default Playground;