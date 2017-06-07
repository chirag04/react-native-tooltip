#import "RCTToolTipText.h"
#import <React/RCTEventDispatcher.h>
#import <React/UIView+React.h>

@implementation RCTToolTipText
{
    RCTEventDispatcher *_eventDispatcher;
    NSInteger _nativeEventCount;
}

- (id)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
    if ((self = [super initWithFrame:CGRectZero])) {
        _eventDispatcher = eventDispatcher;
    }
    
    return self;
}

RCT_NOT_IMPLEMENTED(- (instancetype)initWithFrame:(CGRect)frame)
RCT_NOT_IMPLEMENTED(- (instancetype)initWithCoder:(NSCoder *)aDecoder)

- (BOOL) canBecomeFirstResponder
{
    return YES;
}

- (void)tappedMenuItem:(NSString *)text {
    _nativeEventCount++;
    [_eventDispatcher sendTextEventWithType:RCTTextEventTypeChange
                                        reactTag:self.reactTag
                                            text:text
                                            key:nil
                                      eventCount:_nativeEventCount];
}

- (void)didHideMenu:(NSNotification *)notification {
    _nativeEventCount++;
    [_eventDispatcher sendTextEventWithType:RCTTextEventTypeBlur
                                   reactTag:self.reactTag
                                       text:nil
                                        key:nil
                                 eventCount:_nativeEventCount];

}

- (BOOL)canPerformAction:(SEL)action withSender:(id)sender {
    NSString *sel = NSStringFromSelector(action);
    NSRange match = [sel rangeOfString:@"magic_"];
    if (match.location == 0) {
        return YES;
    }
    return NO;
}

- (NSMethodSignature *)methodSignatureForSelector:(SEL)sel {
    if ([super methodSignatureForSelector:sel]) {
        return [super methodSignatureForSelector:sel];
    }
    return [super methodSignatureForSelector:@selector(tappedMenuItem:)];
}

- (void)forwardInvocation:(NSInvocation *)invocation {
    NSString *sel = NSStringFromSelector([invocation selector]);
    NSRange match = [sel rangeOfString:@"magic_"];
    if (match.location == 0) {
        [self tappedMenuItem:[sel substringFromIndex:6]];
    } else {
        [super forwardInvocation:invocation];
    }
}


@end
