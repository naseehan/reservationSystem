function ToastStatusExample() {
    const toast = useToast()
    const statuses = ['success', 'error', 'warning', 'info']
  
    return (
      <Wrap>
        {/* {statuses.map((status, i) => ( */}
          <WrapItem key={i}>
            <Button
              onClick={() =>
                toast({
                  title: 'success toast',
                  status: success,
                  isClosable: true,
                })
              }
            >
              Show success toast
            </Button>
          </WrapItem>
        {/* ))} */}
      </Wrap>
    )
  }