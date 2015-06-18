#import <UIKit/UIKit.h>
#import "RCTText.h"

@class RCTEventDispatcher;

@interface RCTToolTipText : RCTText

- (void)tappedMenuItem:(NSString *)text;

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

@end
