function exportToLSS() {
    if (!activeRoute || activeRoute.length === 0) {
        alert("Route is empty. Try Again.");
        return;
    }

    const gameName = "Mad Max (2015)";
    const categoryName = "Any%";

    // TODO: ADD VARIABLES
    let xml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <Run version="1.7.0">
            <GameIcon>
            </GameIcon>
            <GameName>
                ${gameName}
            </GameName>
            <CategoryName>
                ${categoryName}
            </CategoryName>
            <LayoutPath>
            </LayoutPath>
            <Metadata>
                <Run id="" />
                <Platform usesEmulator="False">PC</Platform>
                <Region>
                </Region>
                <Variables />
                <CustomVariables />
            </Metadata>
            <Offset>
                00:00:00
            </Offset>
            <AttemptCount>
                0
            </AttemptCount>
            <AttemptHistory />
            <Segments>
    `;

    activeRoute.forEach((step, index) => {
        const locData = locationLibrary[step.id];
        if (!locData) return;

        if(locData.name === "Start") return;

        // add icons later
        xml += `
        <Segment>
            <Name>
                ${locData.name}
            </Name>
            <Icon />
            <SplitTimes>
                <SplitTime name="Personal Best" />
            </SplitTimes>
            <BestSegmentTime />
            <SegmentHistory />
        </Segment>
        `;
    });

    xml += `
        </Segments>
        <AutoSplitter Settings />
    </Run>
    `;

    const blob = new Blob([xml], { type: 'text/plain' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');

    const fileName = `${gameName} - ${categoryName}.lss`;

    link.href = blobUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
}