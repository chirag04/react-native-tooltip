#import "RCTToolTipTextManager.h"

#import "RCTToolTipText.h"
#import "RCTBridge.h"

@implementation RCTToolTipTextManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
    return [[RCTToolTipText alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

@end
